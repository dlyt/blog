const rp = require('request-promise');
const querystring = require('querystring');

const url = 'https://h5.ele.me/hongbao/#hardware_id=&is_lucky_group=True&lucky_number=5&track_id=&platform=0&sn=29eadb67269d8c75&theme_id=1969&device_id=&refer_user_id=4808954';
const query = querystring.parse(url);

const ary = [
    {
        uuid: 'C115261765F3D75598FDFA3FB3C49937',
        sign: '0dfa03ff57f0f3b2088f3ea8d5617d7b',
        phone: '18840822122',
        name: 'xixi'
    },
    {
        uuid: 'D2B37EF38D4CF19B94D59C4749D6FA4F',
        sign: 'a453472d4659fdc757bdb16dba4b58ed',
        phone: '18840822322',
        name: 'a'
    },
    {
        uuid: 'F894D4C7E5167380DB4832F2C41C7446',
        sign: 'ca7ce999cdf3f40d28700aea40ff13d1',
        phone: '18840822422',
        name: 'wang'
    },
    {
        uuid: 'BBFDE64C5A63DC021BDDAAA532E377D5',
        sign: '73999a0b629451bba10a892e2ddc06b5',
        phone: '18840822522',
        name: 'zhang'
    },
    {
        uuid: '9CF4F6CC0DD71B696620D41AA6232EAA',
        sign: 'b84673a5b590f3acc73ff2a8637c1084',
        phone: '18840822622',
        name: 'b'
    },
    {
        uuid: 'C44C1F2C9EF263BC398F2462460136C0',
        sign: 'f274c72d6cd17b377a81fca396e27838',
        phone: '18840822822',
        name: 'c'
    },
    {
        uuid: 'D4EBA9839B22BDB9BEFFDFBA6C32C1A8',
        sign: 'd52a939831a17cea420932979d96fd7e',
        phone: '18840822922',
        name: 'd'
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
        if (num == 7) {
            console.log(d)
            return
        }
        if (totalLen - 1 == len) {
            index(query.lucky_number, query.sn, 7)
        } else if (totalLen == len) {
            console.log(d)
            return 
        } else {
            setTimeout(() => {
                index(query.lucky_number, query.sn, num + 1)
            }, 2000);
            
        }
    })
}

index(query.lucky_number, query.sn, 0);

