var WeiXinPay = require('weixinpay');
var weixinpay = new WeiXinPay({
    // pfx: fs.readFileSync('xxx/xxx/apiclient_cert.p12'),可选，退款需要
     appid: 'wx660c67ecf25170be',//微信小程序appid
     openid: 'owp1J5GeSqhNUjyP4ce0svGtLm-g',//用户openid
     mch_id: '1501862191',//商户帐号ID
     partner_key: 'Mbjh154205886LJKnghn24842041njnh',//秘钥
 });

 weixinpay
 .createUnifiedOrder({
     body: '支付测试ddddddddddddddd',
     out_trade_no: 123123,
     total_fee: 12,
     spbill_create_ip: '127.0.0.1',
     notify_url: 'https://github.com/',
     trade_type: 'JSAPI',
     product_id: '1234567890'
 }, function(body) {
    //  res.send(body);
    console.log(body)
 });