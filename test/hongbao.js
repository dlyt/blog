const rp = require('request-promise');
const querystring = require('querystring');

const url = 'https://h5.ele.me/hongbao/#hardware_id=&is_lucky_group=True&lucky_number=6&track_id=&platform=0&sn=29fde881ba9d8c45&theme_id=2697&device_id=&refer_user_id=4808954';
const query = querystring.parse(url);
 
const ary = [
    {
        uuid: 'D2B37EF38D4CF19B94D59C4749D6FA4F',
        sign: 'a453472d4659fdc757bdb16dba4b58ed',
        phone: '18840822822',
        name: 'a'
    },
    {
        uuid: 'F894D4C7E5167380DB4832F2C41C7446',
        sign: 'ca7ce999cdf3f40d28700aea40ff13d1',
        phone: '18840822422',
        name: 'wang'
    },
    {
        uuid: 'C44C1F2C9EF263BC398F2462460136C0',
        sign: 'f274c72d6cd17b377a81fca396e27838',
        phone: '18840822882',
        name: 'c'
    },
    {
        uuid: 'BBFDE64C5A63DC021BDDAAA532E377D5',
        sign: '73999a0b629451bba10a892e2ddc06b5',
        phone: '18840822880',
        name: 'zhang'
    },
    {
        uuid: 'F0050CFFB1A828972CD63CA42DE4B9D5',
        sign: 'ccb9d7e5f0bffdf0ec95d1d8785d0c8e',
        phone: '18840822090',
        name: 'zhangxiao'
    },
    {
        uuid: '82A43D5166AE46FBCB8086C380E0BB14',
        sign: '16f2666e6cf9a905f683b8096622c05f',
        phone: '18840822091',
        name: 'zhang'
    },
    {
        uuid: 'B9B292218C1CAC8A35DA420F3FDC7530',
        sign: '82ba38a3d1e1ddbc1c140455a9a59454',
        phone: '',
        name: '蜡，小新'
    }
]

const index = (totalLen, sn, num) => {  
    rp({
        method: 'POST',
        uri: `https://h5.ele.me/restapi/marketing/promotion/weixin/${ary[num].uuid}`,
        body: JSON.stringify({
            "device_id": "",
            "group_sn": sn,
            "hardware_id": "",
            "method": "phone",
            "phone": ary[num].phone,
            "platform": 0,
            "sign": ary[num].sign,
            "track_id":"",
            "unionid": "",
            "weixin_avatar": "",
            "weixin_username": ""
        })
    }).then(d => {
        const { promotion_records } = JSON.parse(d);
        const len = promotion_records.length;
        if (totalLen > len + ary.length - 1) {
            console.log('超过最大领取数')
            console.log(len)
            console.log(promotion_records[len - 1])
            return
        }
        if (num == ary.length - 1) {
            console.log('已经是最后一个')
            console.log(promotion_records[len - 1])
            return
        }
        if (len > totalLen) {
            console.log('最大红包已经被领取')
            console.log(promotion_records[len - 1])
            return 
        }
        if (totalLen - 1 == len) {
            console.log('下一个是最大红包')
            index(query.lucky_number, query.sn, ary.length - 1)
        } else if (totalLen == len) {
            console.log('最大红包')
            console.log(promotion_records[len - 1])
            return 
        } else {
            setTimeout(() => {
                console.log('继续领取')
                index(query.lucky_number, query.sn, num + 1)
            }, 1000);
        }
    })
}

index(query.lucky_number, query.sn, 0);

