'use strict';
/**
 * lottery.js 抽奖
 * 抽奖报名
 */

const jsonpData = require('../models/jsonp-data.js');
const LotteryModel = require('../models/lottery.js');
const LotteryUserModel = require('../models/lotteryUser.js');
const couponModel = require('../models/coupon.js');
const cityModel = require('../models/city.js');
const smsModel = require('../models/sms.js');
const _ = require('underscore');
const moment = require('moment');

const lotteryCtrl = {};

const FIRST_LOTTERY_ID = 1000;
const FIRST_LOTTERY_NAME = '1200现金券（包含蜜月500，婚庆500，摄影200）';
const FIRST_COUPON_SERVICE = ['honeymoon', 'ceremony', 'wedding'];
const FIRST_LOTTERY_SMS = 0;

const co = require('co');
const sms = require('dxl-sms');
const dxlMcrypt = require('dxl-mcrypt');
const Prize = require('../models/prizes');
const WinnerAla = require('../models/winnerAla');
const { utilities } = require('dxl-util');
const { Sone, Stwo, Sthree } = require('../../conf/prize');
const { EventDb } = require('../lib/mysqlPool');
const { Lottery315, SecondsGrab } = require('../models/lottery315.js');//幸运大转盘 秒抢
const RandExp = require('randexp')

lotteryCtrl.index = (req, res) => {
    co(function* () {
        if (!req.query.city) {
            return res.jsonp(jsonpData(-1, '参数不全', {}));
        }
        const city = decodeURI(req.query.city);
        // 是否抽过
        const user = yield Prize.findOne({
            where: { uid: req.session.user_id }
        });
        // uid 主键
        if (Object.keys(user).length) {
            return res.jsonp(jsonpData(-2, '您的抽奖机会已用完', {}));
        }
        // 根据概率抽奖 
        const random = getRandomInt(0, 100);
        let prizeNo;
        const conn = yield getConnection();
        try {
            yield query(conn, 'begin');
            yield query(conn, `set tx_isolation='serializable'`);
            if (city == 7) {
                if (random < Sone) {
                    prizeNo = 1;
                } else if (Sone <= random && random < Stwo) {
                    prizeNo = 2;
                } else if (Stwo <= random && random < Sthree) {
                    prizeNo = 3;
                } else {
                    prizeNo = 4;
                }
            } else {
                if (random < 20) {
                    prizeNo = 3;
                } else {
                    prizeNo = 4;
                }
            }
            yield query(
                conn,
                'insert into prize (uid,prize_no,city,create_time) values (?,?,?,?)',
                [
                    req.session.user_id,
                    prizeNo,
                    city,
                    Math.round(new Date().getTime() / 1000)
                ]
            )
            if (prizeNo === 1) {
                const onePrize = yield query(
                    conn,
                    'select count(*) as count from prize where prize_no = ?',
                    [1]
                );
                if (onePrize[0].count < 6) {
                    yield query(conn, 'commit');
                    const decodeMobile = yield dxlMcrypt.dxlDecryptMobile(req.session.mobile, '年终大促抽奖');
                    yield sms.smsSend({
                        mobile: decodeMobile,
                        msg: '恭喜您抽中【到喜啦年终大奖】—价值1288元出门纱，活动期限自抽中日起30天内有效（春节除外）。凭此短信至门店领取，门店地址：上海市普陀区礼泉路700弄38号203。稍后会有到喜啦专业顾问向您致电。'
                    });
                } else {
                    yield query(conn, 'rollback');
                    prizeNo = 4;
                    yield Prize.save({
                        uid: req.session.user_id,
                        prize_no: prizeNo,
                        city: city,
                        create_time: Math.round(new Date().getTime() / 1000)
                    });
                }
            }
            if (prizeNo === 2) {
                const onePrize = yield query(
                    conn,
                    'select count(*) as count from prize where prize_no = ?',
                    [2]
                );
                if (onePrize[0].count < 11) {
                    yield query(conn, 'commit');
                    const decodeMobile = yield dxlMcrypt.dxlDecryptMobile(req.session.mobile, '年终大促抽奖');
                    yield sms.smsSend({
                        mobile: decodeMobile,
                        msg: '恭喜您抽中【到喜啦年终大奖】—价值5000元试妆一次，活动期限自抽中日起60天内有效（春节除外）。凭此短信至门店体验，门店地址：上海市静安区西藏北路605号C座204。稍后会有到喜啦专业顾问向您致电。'
                    });
                } else {
                    yield query(conn, 'rollback');
                    prizeNo = 4;
                    yield Prize.save({
                        uid: req.session.user_id,
                        prize_no: prizeNo,
                        city: city,
                        create_time: Math.round(new Date().getTime() / 1000)
                    });
                }
            }
            conn.release();
        } catch (err) {
            yield query(conn, 'rollback');
            conn.release();
            throw err;
        };
        return res.jsonp(jsonpData(1, 'ok', {
            prizeNo: prizeNo
        }));
    }).catch(err => {
        console.log(err)
        return res.jsonp(jsonpData(-3, '服务器繁忙', {}));
    });
};

// 315大促活动抽奖
lotteryCtrl.lottery315 = (req, res) => {
    co(function* () {
        const city = decodeURI(req.query.city);
        if (!checkCity(city)) {
            return res.jsonp(jsonpData(-1, '入参有误', {}));
        }
        // 是否抽过
        const user = Lottery315.findOne({
            where: { userid: req.session.user_id }
        });

        // 查询当前日历中奖记录
        const prize_count = Lottery315.count({
            where: { prize_type: 1 }
        });

        var resList = yield [user, prize_count];

        // uid 主键
        if (Object.keys(resList[0]).length) {
            return res.jsonp(jsonpData(-2, '您的抽奖机会已用完', {}));
        }

        const random = getRandomInt(0, 100);// 根据概率抽奖 
        //1 到喜啦精美日历	 2 100元现金券  20% 且日历奖品数量小于100时，prize_type=1
        let prize_type = random < 20 && resList[1][0].count < 100 ? 1 : 2;
        let prize_name = prize_type === 1 ? '到喜啦精美日历' : '100元现金券'
        let msg = prize_type === 1 ? '恭喜您！成功抽中到喜啦精美日历一份' : '恭喜您！成功抽中100元现金券'
        if (prize_type === 1) {//发送短信
            try {
                const decodeMobile = yield dxlMcrypt.dxlDecryptMobile(req.session.mobile, '年终大促抽奖');
                yield sms.smsSend({
                    mobile: decodeMobile,
                    msg: '【到喜啦】恭喜您参加“315全民婚礼月”活动，成功抽中精美日历一份！客服将会在一个工作日内与您联系，请保持电话畅通。'
                });
            } catch (e) {
                console.error(e)
                // return res.jsonp(jsonpData());
            }
        }

        //可以参与活动,记录
        yield Lottery315.save({
            userid: req.session.user_id,
            city,
            prize_type,
            create_time: Math.round(new Date().getTime() / 1000)
        })
        return res.jsonp(jsonpData(1, msg, { prize_type, prize_name }));
    }).catch((e) => {
        return res.jsonp(jsonpData(-1, "服务器处理异常", e.stack));
    });
};

// 315大促活动秒抢 初步完成
lotteryCtrl.secondsGrab = (req, res) => {
    co(function* () {
        if (moment().format("HH:mm:ss") < "10:00:00") {
            return res.jsonp(jsonpData(-5, '活动尚未开始，请稍后！', {}));
        }

        const city = decodeURI(req.query.city);
        if (!checkCity(city)) {
            return res.jsonp(jsonpData(-1, '入参有误', {}));
        }
        //是否参与过
        const user = SecondsGrab.findOne({
            where: { userid: req.session.user_id }
        });

        //是否参与过
        const prizeList = SecondsGrab.count({
            where: {
                create_time: {
                    "$gte": moment(moment().format("YYYY-MM-DD")).unix(),
                    "$lt": moment(moment().add(1, "days").format("YYYY-MM-DD")).unix()
                }
            }
        });

        var resList = yield [user, prizeList]//异步查询
        // uid 主键
        if (Object.keys(resList[0]).length) {
            return res.jsonp(jsonpData(-2, '您已领取过，不能贪心哦~', {}));
        }

        if (resList[1][0].count >= 10) { //限制每天10张
            return res.jsonp(jsonpData(-3, '抢光啦，明天赶早~', {}));
        }
        //可以参与活动,记录
        yield SecondsGrab.save({
            userid: req.session.user_id,
            city,
            create_time: Math.round(new Date().getTime() / 1000)
        })
        return res.jsonp(jsonpData(1, '抢券成功，请至我的卡券中查看', {}));
    }).catch((e) => {
        return res.jsonp(jsonpData(-1, "服务器处理异常", e.stack));
    });
};

// ala抽奖
lotteryCtrl.ala = (req, res) => {
    co(function* () {
        // 用户手机号
        let mobile = req.query.mobile;
        //let mobile = req.session.mobile;
        if (!mobile) {
            return res.jsonp({ code: -1, msg: '请绑定手机号码' });
        }
        // 手机号码格式验证
        if (!utilities.isDxlPhone(mobile)) {
            return res.jsonp({ code: -1, msg: '请绑定正确的手机号码' });
        }
        // 抽奖区域
        let queryRegion = req.query.region;
        let region = ['JinShan', 'HuangPu'];
        if (!region.includes(queryRegion)) {
            return res.jsonp({ code: -1, msg: '区域参数错误' });
        }
        // 金山区奖品
        let jinShanPrizes = [
            {
                id: 2,
                name: '礼服租借',
                amount: 100,
                percent: 20,
                random: [1, 20]
            },
            {
                id: 3,
                name: '婚车券',
                amount: 100,
                percent: 20,
                random: [21, 40]
            },
            {
                id: 4,
                name: 'usb',
                amount: 50,
                percent: 25,
                random: [41, 65]
            },
            {
                id: 5,
                name: '喜字贴',
                amount: 50,
                percent: 25,
                random: [66, 90]
            },
            {
                id: 6,
                name: '洗漱包',
                amount: 50,
                percent: 10,
                random: [91, 100]
            },
        ];
        // 黄浦区奖品，同金山区奖品
        let huangPuPrizes = JSON.parse(JSON.stringify(jinShanPrizes));
        let allPrizes = {
            JinShan: jinShanPrizes,
            HuangPu: huangPuPrizes
        };
        //抽奖
        let prizeName;
        const randomNumber = getRandomIntInclusive(1, 100);  // 产生1-100直接的随机数，包括1和100
        const conn = yield getConnection();
        try {
            yield query(conn, 'begin');
            yield query(conn, `set tx_isolation='serializable'`);
            // 是否中过
            let winner = yield query(
                conn,
                'select * from winner_ala where mobile = ? for update',
                [mobile]
            )
            if (Object.keys(winner).length) {
                yield query(conn, 'commit');
                conn.release();
                return res.jsonp({ code: 2, msg: '', data: winner.prizeName });
            }
            // 按区域和奖品Id统计已中奖数目
            let winnerAlas = yield query(
                conn,
                'select prizeId,count(*) as amount from winner_ala where prizeRegion = ? group by prizeRegion,prizeId for update',
                [queryRegion]
            );
            // 某区域的奖品设置情况
            let prizes = allPrizes[queryRegion];
            prizes = prizes.map(p => {
                let winnerAla = winnerAlas.find(w => {      // 查找已中奖的数目
                    return w.prizeId === p.id;
                });
                if (winnerAla) {
                    p.amount = p.amount - winnerAla.amount; // 计算已剩余的数目
                }
                return p;
            });
            // 获取剩余的奖品:按剩余数目降序
            let remainPrizes = prizes.filter(p => {
                return p.amount > 0
            }).sort((a, b) => {
                return b.amount - a.amount;
            });
            // 剩余奖品数量为0的奖品，即已抽取完的奖品
            let emptyPrizes = prizes.filter(p => {
                return p.amount === 0
            });
            if (remainPrizes.length) {
                // 单独处理已经排序好剩余奖品数组的第一个元素
                // 将所有已抽取完的奖品的概率百分比分配到剩余数目最多的奖品上，即已经剩余数目降序排序好剩余奖品数组的第一个
                let addPercent = 0;
                emptyPrizes.forEach(ep => {
                    addPercent = addPercent + ep.percent;
                });
                remainPrizes[0].random[0] = 1; // 默认起始下标1
                remainPrizes[0].random[1] = remainPrizes[0].percent + addPercent;   // 例如：20 + 25 = 45
                // 处理第二个及以后随机数范围
                for (let i = 1; i < remainPrizes.length; i++) {
                    //  上标为上一个下标+1             例如： 45 + 1
                    remainPrizes[i].random[0] = remainPrizes[i - 1].random[1] + 1;
                    //  下标为上一个下标 + 百分比数字    例如：45 + 20
                    remainPrizes[i].random[1] = remainPrizes[i - 1].random[1] + remainPrizes[i].percent;
                }
            } else {
                yield query(conn, 'commit');
                conn.release();
                return res.jsonp({ code: 3, msg: '全部奖品已抽完' });
            }
            let prize = remainPrizes.filter(p => {
                return (randomNumber > p.random[0] || randomNumber === p.random[0]) && (randomNumber === p.random[1] || randomNumber < p.random[1])
            });
            let prizeId = (prize && prize[0] && prize[0].id);
            prizeName = prize && prize[0] && prize[0].name;
            // 保存中奖情况
            yield query(
                conn,
                'insert into winner_ala (mobile,prizeId,prizeName,prizeRegion) values (?,?,?,?)',
                [mobile, prizeId, prizeName, queryRegion]
            );
            yield query(conn, 'commit');
            //yield WinnerAla.save({ mobile: mobile, prizeId: prizeId, prizeName: prizeName, prizeRegion: queryRegion });
            conn.release();
        } catch (err) {
            yield query(conn, 'rollback');
            conn.release();
            throw err;
        };
        return res.jsonp({ code: 1, msg: '', data: prizeName });
    }).catch(err => {
            console.log(err)
            return res.jsonp({ code: -2, msg: '服务器错误' });
        });
};

//315活动城市列表
const cityList = {
    "sh": "上海",
    "bj": "北京",
    "sz": "苏州",
    "hz": "杭州",
    "cd": "成都",
    "wh": "武汉",
    "changzhou": "常州",
    "chongqing": "重庆",
    "sy": "沈阳",
    "wuxi": "无锡",
    "tj": "天津",
    "nj": "南京"
}
//校验城市 是否符合
const checkCity = (city) => {
    return _.isEmpty(cityList[city]) ? false : true;
};

const query = (conn, sql, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, rows, field) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
};

const getConnection = () => {
    return new Promise((resolve, reject) => {
        EventDb.pool.getConnection((err, conn) => {
            if (err) {
                return reject(err);
            }
            return resolve(conn);
        });
    });
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 抽奖
lotteryCtrl.luck = function (req, res, next) {
    let params = {
        mobile: req.query.mobile || req.cookies['user[mobile]'],
        channel: req.query.channel || 'PC',
        event: req.query.event || 'JieHunTeHuiJi',
        city: req.query.city || req.cookies.city || 'default_sh',
        userID: req.cookies['user[id]'],
        cityID: req.cookies.city_id
    };

    let ret = jsonpData();
    // 是否登录
    if (!params.mobile || !req.isLogin() || params.mobile !== req.cookies['user[mobile]']) {
        ret = jsonpData(-5, '未登录，请先登录');
        return res.jsonp(ret);
    }
    // 查找活动用户
    LotteryUserModel.findUserWithLottery(params.mobile)
        .catch((e) => {
            console.error(e.stack);
            return res.jsonp(jsonpData());
            // 没有查到用户，新建用户
        }).then((user) => {
            if (user === null) {
                let user = new LotteryUserModel({
                    mobile: params.mobile,
                    event: params.event,
                    channel: params.channel,
                    city: params.city
                });
                return user.save().then((production) => {
                    return production;
                });
            }
            return user;
            // 得到用户数据
        }).then((user) => {
            // 机会用完
            if (!!user.firstLottery && !!user.secondLottery) {
                return jsonpData(-2, '抽奖机会已经用完');
                // 没有分享
            } else if (!!user.firstLottery && !user.hasShare) {
                return jsonpData(-3, '抽奖机会已经用完，分享后可以再得到一次机会');
                // 第二次抽奖
            } else if (!!user.firstLottery && !!user.hasShare) {
                // 开始抽奖
                // 1. 获取奖品池
                return LotteryModel.getLotteries(new Date())
                    // 2. 抽奖且更新奖品库存
                    .then((lotteryPool) => {
                        let luckyLottery = LotteryModel.luckyLottery(lotteryPool);
                        if (luckyLottery === null) {
                            return luckyLottery;
                        }
                        return LotteryModel.findOneAndUpdate({
                            _id: luckyLottery._id,
                            amount: { $gt: 0 }
                        }, { $inc: { amount: -1 } }).exec();
                        // 3. 用户领奖
                    }).then((lottery) => {
                        // 得到实物奖品
                        if (lottery && lottery._id) {
                            console.log(`Mobile ${user.mobile} get ${lottery.name} _id ${lottery._id}`);
                            user.set({
                                secondLottery: lottery.name,
                                secondLotteryObj: lottery._id,
                                secondTime: new Date(),
                                secondChannel: params.channel
                            });
                            return user.save().then((user) => {
                                if (lottery.sms) {
                                    return LotteryUserModel.findUserWithLottery(user.mobile)
                                        .then(smsModel.sendSMS({ templateID: lottery.sms, phone: user.mobile })
                                            .catch((e) => {
                                                console.log(`mobile ${user.mobile} send sms failed!`);
                                                console.log(e);
                                            })
                                        );
                                }
                                return LotteryUserModel.findUserWithLottery(user.mobile);
                            }).then((user) => {
                                let result = jsonpData(1, 'success', {
                                    mobile: user.mobile,
                                    lottery: user.secondLottery,
                                    lotteryID: user.secondLotteryObj.lid
                                });
                                return result;
                            }).catch((e) => {
                                throw e;
                            });
                            // 得到虚拟奖品或者默认奖品
                        } else {
                            return jsonpData(-1, '抽奖失败');
                        }
                    }).catch((e) => {
                        throw e;
                    });
                // 第一次抽奖
            } else if (!user.firstLottery) {
                let couponMsg = {};
                // 用户领取第一次抽奖奖品
                // 1. 领取优惠券
                return cityModel.cityInfoAsync({ id: params.cityID })
                    // 获取优惠券id
                    .then((city) => {
                        let curCityName = city && city.name || '上海';
                        let result = {
                            cityName: curCityName
                        };
                        // 根据业务类型查询优惠券id 并发数组
                        let infoPromises = _.map(FIRST_COUPON_SERVICE, (type) => {
                            // 成功返回结果，失败返回空数据
                            return couponModel.infoAsync({
                                service_type: type,
                                city: curCityName
                            }).then((coupons) => {
                                // console.log('get INFO ', JSON.stringify(coupons));
                                // console.log('get INFO ', type);
                                let ids = [];
                                if (_.isArray(coupons)) {
                                    ids = _.map(coupons, function (coupon) {
                                        return coupon.id;
                                    });
                                }
                                // console.log('get ids ', ids);
                                return ids;
                            }).catch(() => {
                                return [];
                            });
                        });
                        // 并发查询
                        return Promise.all(infoPromises).then((values) => {
                            values = _.compact(values); // 去空
                            let couponIDs = _.union.apply(_, values); // 合并结果集
                            // 获取优惠券id数组
                            couponIDs = _.chain(couponIDs).compact().uniq().value();
                            // console.log('couponIds ', couponIDs);
                            result.couponIDs = couponIDs;
                            return result;
                        });
                    })
                    .then((result) => {
                        let couponData = {
                            params: []
                        };
                        let curCityName = result.cityName;
                        let couponIDs = result.couponIDs;

                        if (couponIDs && couponIDs.length > 0) {
                            couponData.params = JSON.stringify(_.map(couponIDs, function (id) {
                                return ({
                                    user_id: params.userID,
                                    coupon_id: id,
                                    channel: params.channel,
                                    city: curCityName
                                });
                            })
                            );
                            // 获取优惠券
                            return couponModel.mulReceiveAsync(couponData)
                                .then((ret) => {
                                    // console.log(ret);
                                    let hasFailed = 0;
                                    let errorMsg = '';
                                    if (!_.isArray(ret)) {
                                        throw ret;
                                    }
                                    for (let i = 0; i < ret.length; ++i) {
                                        var result = ret[i];
                                        if (!(result && result.id)) {
                                            console.error('Receive coupon failed INFO: ', params.userID, JSON.parse(couponData.params)[i].coupon_id, result);
                                            hasFailed += 1;
                                            errorMsg = result.msg;
                                        }
                                    }
                                    // 获取优惠券成功
                                    if (hasFailed === 0) {
                                        return jsonpData(1, '领取成功');
                                    } else if (hasFailed < ret.length) {
                                        return jsonpData(1, '已领取优惠券');
                                    } else {
                                        let err = {
                                            code: -1,
                                            msg: errorMsg,
                                            data: ret
                                        };
                                        return err;
                                    }
                                })
                                .catch((e) => {
                                    // 获取优惠券失败
                                    console.error(e.stack);
                                    ret = jsonpData(-1, e.msg || '获取优惠券接口有误', e.data);
                                    return ret;
                                });
                        } else {
                            return jsonpData(1, '该奖品没有优惠券');
                        }
                        // 2. 用户登记奖品
                    }).then((couponRst) => {
                        couponMsg = couponRst;
                        user.set({ firstLottery: FIRST_LOTTERY_NAME, firstTime: new Date(), firstChannel: params.channel });
                        return user.save();
                        // 3. 获取登记后的用户数据
                    }).then((user) => {
                        if (FIRST_LOTTERY_SMS) {
                            return LotteryUserModel.findUserWithLottery(user.mobile)
                                .then(smsModel.sendSMS({ templateID: FIRST_LOTTERY_SMS, phone: user.mobile })
                                    .catch((e) => {
                                        console.log(`mobile ${user.mobile} send sms failed!`);
                                        console.log(e);
                                    })
                                );
                        }
                        return LotteryUserModel.findUserWithLottery(user.mobile);
                        // 4. 构建返回的奖品数据
                    }).then((user) => {
                        let result = jsonpData(1, 'success', {
                            mobile: user.mobile,
                            lottery: user.firstLottery,
                            lotteryID: FIRST_LOTTERY_ID,
                            couponMsg: couponMsg
                        });
                        return result;
                    }).catch((e) => {
                        throw e;
                    });
            }
        }).then((data) => {
            // console.log(data);
            return res.jsonp(data);
        }).catch((e) => {
            console.error(e.stack);
            return res.jsonp(jsonpData(-1, e.msg || undefined));
        });
};

// 分享
lotteryCtrl.share = function (req, res, next) {
    let params = {
        mobile: req.query.mobile || req.cookies['user[mobile]'],
        channel: req.query.channel || 'PC',
        city: req.query.city || req.cookies.city || 'default_sh',
        event: req.query.event || 'JieHunTeHuiJi'
    };

    let ret = jsonpData();
    if (!params.mobile || !req.isLogin() || params.mobile !== req.cookies['user[mobile]']) {
        ret = jsonpData(-5, '未登录，请先登录');
        return res.jsonp(ret);
    }
    // 查找活动用户
    LotteryUserModel.findUserWithLottery(params.mobile)
        .catch((e) => {
            console.error(e);
            return res.jsonp(jsonpData());
            // 没有查到用户，新建用户
        }).then((user) => {
            if (user === null) {
                let user = new LotteryUserModel({
                    mobile: params.mobile,
                    event: params.event,
                    channel: params.channel,
                    city: params.city
                });
                return user.save().then((production) => {
                    return production;
                });
            }
            return user;
            // 分享
        }).then((user) => {
            if (user.hasShare) {
                return jsonpData(-2, '已分享过');
            }
            user.set({ hasShare: true });
            return user.save().then((data) => {
                if (data.hasShare) {
                    return jsonpData(1, '己获取资格');
                }
                return jsonpData();
            }).catch((e) => {
                throw e;
            });
        }).then((rst) => {
            res.jsonp(rst);
        }).catch((e) => {
            console.error(e.stack);
            res.jsonp(jsonpData);
        });
};

// 登记报名
lotteryCtrl.sign = function (req, res, next) {
    let params = {
        mobile: req.query.mobile || req.cookies['user[mobile]'],
        channel: req.query.channel || 'PC',
        city: req.query.city || req.cookies.city || 'default_sh',
        event: req.query.event || 'JieHunTeHuiJi'
    };

    let ret = jsonpData();
    if (!params.mobile || !req.isLogin() || params.mobile !== req.cookies['user[mobile]']) {
        ret = jsonpData(-5, '未登录，请先登录');
        return res.jsonp(ret);
    }
    // 查找活动用户
    LotteryUserModel.findUserWithLottery(params.mobile)
        .catch((e) => {
            console.error(e);
            return res.jsonp(jsonpData());
            // 没有查到用户，新建用户
        }).then((user) => {
            if (user === null) {
                let user = new LotteryUserModel({
                    mobile: params.mobile,
                    event: params.event,
                    channel: params.channel,
                    city: params.city
                });
                return user.save().then((production) => {
                    return production;
                });
            }
            return user;
            // 登记报名
        }).then((user) => {
            if (user.sign) {
                return jsonpData(-2, '已经报名过');
            }
            user.set({ sign: true, signTime: new Date() });
            return user.save().then((data) => {
                if (data.sign && data.firstLottery && data.secondLottery) {
                    return jsonpData(2, '报名成功', { msg: '抽奖资格已用完' });
                }
                if (data.sign) {
                    return jsonpData(1, '报名成功');
                }
                return jsonpData();
            }).catch((e) => {
                throw e;
            });
        }).then((rst) => {
            res.jsonp(rst);
        }).catch((e) => {
            console.error(e.stack);
            res.jsonp(jsonpData);
        });
};

// 数据
lotteryCtrl.all = function (req, res, next) {
    if (!req.cookies.dxl || req.cookies.dxl !== 'JieHunTeHuiJidxl') {
        return res.jsonp(jsonpData(-2, '访问失败'));
    }
    // 查找活动用户
    LotteryUserModel.all()
        .then((users) => {
            users = _.chain(users).map((user) => {
                return _.pick(user, ['_id', 'mobile', 'event', 'channel', 'city', 'hasShare', 'sign', 'signTime', 'firstLottery', 'firstTime', 'firstChannel', 'secondLottery', 'secondTime', 'secondChannel', 'join']);
            }).map((user) => {
                if (user.firstTime) {
                    user.firstTime = moment(user.firstTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
                }
                if (user.signTime) {
                    user.signTime = moment(user.signTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
                }
                if (user.secondTime) {
                    user.secondTime = moment(user.secondTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
                }
                if (user.join) {
                    user.join = moment(user.join).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
                }
                return user;
            }).value();
            return res.jsonp(users);
        }).catch((e) => {
            console.stack(e);
            return res.jsonp(jsonpData());
        });
};

module.exports = lotteryCtrl;
