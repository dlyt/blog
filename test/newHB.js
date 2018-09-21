const rp = require('request-promise');

const index = async () => {  
    // const { validate_token } = await rp({
    //     method: 'POST',
    //     uri: `https://h5.ele.me/restapi/eus/login/mobile_send_code`,
    //     body: JSON.stringify({
    //         mobile: "18840822722",
    //         captcha_hash: "",
    //         captcha_value: ""
    //     })
    // })
    // console.log(validate_token)
    const data = await rp({
        method: 'POST',
        uri: `https://h5.ele.me/restapi/marketing/promotion/weixin/B9B292218C1CAC8A35DA420F3FDC7530`,
        body: JSON.stringify({
            device_id: "",
            group_sn: '2a09bae39d1d8c46',
            hardware_id: "",
            method: "phone",
            phone: "",
            platform: 4,
            sign: '82ba38a3d1e1ddbc1c140455a9a59454',
            track_id: "",
            unionid: "fuck",
            weixin_avatar: '',
            weixin_username: ''
        }),
        headers: {
            "x-shard": `eosid=${parseInt('2a09bae39d1d8c46', 16)}`,
            cookie: `SID=4808954`
        }
    })
    console.log(data)
}

index();

// https://h5.ele.me/restapi/eus/login/mobile_send_code
// captcha_hash: "cd05bf86280376ba29d9da400eead947-5ba09861"
// captcha_value: "vuny"
// mobile: "18840822722"

// https://h5.ele.me/restapi/eus/login/login_by_mobile
// mobile: "18840822722"
// validate_code: "579824"
// validate_token: "7ae1bf71442c8d639d8cfa2a16a8fe995e6ba779d04e437271bbe8c96b7110c0"

// https://h5.ele.me/restapi/marketing/hongbao/weixin/B9B292218C1CAC8A35DA420F3FDC7530/change
// phone: "18840822722"
// sign: "82ba38a3d1e1ddbc1c140455a9a59454"

