const co = require('co');
const { GalaxyDb } = require('../lib/mysqlPool');

exports.smsSend = function(req,res){
    GalaxyDb.pool.getConnection((err, conn) => {
        co(function* () {
            // start transaction
            yield query(conn, 'SET AUTOCOMMIT = 0');
            yield query(conn, 'begin');
            const rows = yield query(conn, `INSERT INTO dxl_galaxy.ex_user_credit ( uid, credits_get, credits_consume, credits_remain, status, create_time, remarks) VALUES ( '89', '0', '0', '20', '0', NULL, '');`);
            const _rows = yield query(conn, 'select * from ex_user_credit');
            console.log(_rows)
            yield query(conn, 'rollback');
        }).catch(err => {
            console.log(err)
        });
        res.json(3);
    });
};

const query = (conn, sql, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, rows, field) => {
            if (err) {
                console.log(err)
            }
            return resolve(rows);
        });
    });
};



const co = require('co');
const { Order, Shop, ShopOrder } = require('../models');
const { wrapData, mysqlPool, alipay } = require('../lib');
const CosmoDb = mysqlPool.CosmoDb;

const OrderCtrl = {};

OrderCtrl.create = (req, res) => {
    const data = wrapData({ code: -1 });
    co(function* () {
        if (!req.body.quantity || !req.body.amount || !req.body.payment) {
            data.msg = '参数有误';
            return res.json(data);
        }
        const userShop = yield Shop.findOne({
            where: {
                user_id: req.user.uid
            }
        });
        let _amount = null;
        let url = '';
        const { quantity, amount, payment } = req.body;
        if (Object.keys(userShop).length) {
            _amount = quantity * 299;
        } else {
            _amount = 2000;
            if (quantity !== 1) {
                _amount = _amount + (quantity - 1) * 299;
            } 
        }
        if (amount !== _amount) {
            data.msg = '参数有误';
            return res.json(data);
        }
        const oldOrder = yield Order.findOne({
            where: {
                user_id: req.user.uid,
                status: 0
            }
        });
        if (Object.keys(oldOrder).length) {
            data.code = -2;
            data.msg = '存在未处理的订单';
            return res.json(data);
        }
        const conn = yield getConnection();
        try {
            const order = yield query(
                conn,
                'insert into cos_order (user_id,quantity,amount,payment,create_time) values (?,?,?,?,?)',
                [
                    req.user.uid,
                    0.01, // todo: 修改总价
                    payment,
                    Math.round(new Date().getTime() / 1000)
                ]
            );
            const orderNo = getOrderNo(order.insertId);
            yield query(
                conn,
                'update cos_order set order_no = ? where id = ?',
                [
                    orderNo,
                    order.insertId
                ]
            );
        } catch (err) {
            
        };
        const order = yield Order.save({
            user_id: ,
            quantity: quantity,
            amount: 
            payment: 1,
            create_time: Math.round(new Date().getTime() / 1000)
        });
        
        yield Order.update({
            set: {
                order_no: orderNo
            },
            where: {
                id: order.insertId
            }
        });
        if (payment === 1) {
            const params = alipay.pagePay({
                subject: '测试商品',
                body: '测试商品描述',
                outTradeId: orderNo,
                timeout: '10m',
                amount: 0.01,
                goodsType: '0',
                qrPayMode: 2,
                return_url: 'http://www.cosmoevents-bride.com/api/orders/pay/back?orderNo=' + orderNo
            });
            url = 'https://openapi.alipay.com/gateway.do?' + params;
        }
        data.code = 1;
        data.data.url = url;
        return res.json(data);
    }).catch(err => {
        console.error(err);
        data.code = -3;
        return res.json(data);
    });
};

function getOrderNo(id){
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    id ='00000' + id;
    return `${year.substring(year.length - 2)}${month}${day}${id.substring(id.length-5, id.length)}`;
}

OrderCtrl.payBack = (req, res) => {
    const data = wrapData({ code: -1 });
    co(function* () {
        if (req.query.orderNo) {
            const { orderNo } = req.query;
            const alipayResponse = yield alipay.query({
                outTradeId: orderNo
            });
            const body = JSON.parse(alipayResponse.body).alipay_trade_query_response;
            const options = {
                where: {
                    order_no: orderNo
                },
                set: {}
            };
            if (parseInt(body.code) == 10000) {
                const order = yield Order.findOne(options);
                if (order.amount == body.total_amount) {
                    if (order.status !== 1) {
                        options.set.status = 1;
                        yield Order.update(options);
                        const count = yield ShopOrder.count({
                            where: {
                                order_id: order.id
                            }
                        });
                        let quantity = order.quantity - count[0].count;
                        const conn = yield getConnection();
                        try {
                            yield query(conn, 'begin');
                            while (quantity > 0) {
                                const shop = yield query(
                                    conn,
                                    'insert into cos_shop (user_id) values (?)',
                                    [order.user_id]
                                );
                                yield query(
                                    conn,
                                    'insert into cos_shop_order (shop_id, order_id) values (?,?)',
                                    [shop.insertId, order.id]
                                );
                                quantity--;
                            }
                            yield query(conn, 'commit');
                            conn.release();
                        } catch (err) {
                            console.error(err);
                            yield query(conn, 'rollback');
                            conn.release();
                        };
                    }
                }
            }
        }         
        return res.redirect('http://www.cosmoevents-bride.com/');
    }).catch(err => {
        console.error(err);
        return res.redirect('http://www.cosmoevents-bride.com/');
    });
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
        CosmoDb.pool.getConnection((err, conn) => {
            if (err) {
                return reject(err);
            }
            return resolve(conn);
        });
    });
};

module.exports = OrderCtrl;

const order = yield Order.save({
    user_id: req.user.uid,
    quantity: quantity,
    amount: 0.01, // todo: 修改总价
    payment: 1,
    create_time: Math.round(new Date().getTime() / 1000)
});
const orderNo = getOrderNo(order.insertId);
yield Order.update({
    set: {
        order_no: orderNo
    },
    where: {
        id: order.insertId
    }
});