const msgArr = [
    {
        type: 'beihun',
        msg: '恭喜您已成功领取￥32000元超全备婚大礼包！微信关注[到喜啦]、回复关键词[礼包] ，即可领取2020年最全备婚清单， 稍后结婚顾问会联系您告知其余优惠的领取方式，下载到喜啦APP：http://dxlfile.com/eFlB，获得更多优惠活动，咨询热线：400-820-1709'
    }
];

const a = msgArr.find(item => item.type == 'beihun');
console.log(a)
if (a) {
    console.log(1)
}