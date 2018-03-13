const crypto = require('crypto');
const secret = `d_uid=${encodeURIComponent('test')}&hotel_name=${encodeURIComponent('宋星际酒店-徐汇')}&pay_money=${encodeURIComponent(3000)}&timestamp=${encodeURIComponent(1514095991)}&weddingtime=${encodeURIComponent('2017-09-30 00:00:00').replace(/%20/g,'+')}`
console.log(secret)
const key1 = crypto.createHash('sha1').update('re#)%^FDWRD#ARE_GORBN416Q' + secret).digest('hex').toUpperCase()
const key2 = crypto.createHash('md5').update('1514095991').digest('hex').toUpperCase()
console.log(Buffer.from(crypto.createHash('sha1').update(key2 + key1).digest('hex').toUpperCase()).toString('base64'));