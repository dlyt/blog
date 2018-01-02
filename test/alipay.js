const path = require('path');
const Alipay = require('alipay-node-sdk');

let outTradeId = Date.now().toString();

/**
 *
 * @param {Object} opts
 * @param {String} opts.appId  支付宝的appId
 * @param {String} opts.notifyUrl  支付宝服务器主动通知商户服务器里指定的页面http/https路径
 * @param {String} opts.rsaPrivate  商户私钥pem文件路径
 * @param {String} opts.rsaPublic  支付宝公钥pem文件路径
 * @param {String} opts.signType   签名方式, 'RSA' or 'RSA2'
 * @param {Boolean} [opts.sandbox] 是否是沙盒环境
 * @constructor
 */
var ali = new Alipay({
    appId: '2016082100308153',
    notifyUrl: 'http://www.xxx.com/callback/alipay',
    rsaPrivate: path.resolve('./private.pem'),
    rsaPublic: path.resolve('./public.pem'),
    sandbox: true,
    signType: 'RSA2'
});

var params = ali.pagePay({
    subject: '测试商品',
    body: '测试商品描述',
    outTradeId: outTradeId,
    timeout: '10m',
    amount: '10.00',
    goodsType: '0',
    qrPayMode: 0
});
console.log(params);
console.log(outTradeId)
ali.query({
    outTradeId: '1512438108128'
}).then(function (ret) {
    console.log("***** ret.body=" + ret.body);
    
    //签名校验
    var ok = ali.signVerify(ret.json());
});

var fs = require('fs');
const crypto = require('crypto')

var sign = () => {
    const str = 'app_id=2016082100308153&sign_type=RSA2'
    const privateKey = fs.readFileSync(path.resolve('./conf/alipay/private.pem'), 'utf-8')
    const sha = crypto.createSign('RSA-SHA256');
    sha.update(str, 'utf8')
    console.log(sha.sign(privateKey, 'base64'))
}
sign()