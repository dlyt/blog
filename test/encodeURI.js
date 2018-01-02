// console.log(encodeURI('https://open.weixin.qq.com/connect/qrconnect?appid=wx6d33439a052a4f5c&redirect_uri=https://sh.daoxila.com&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect'))

const d = {
    a: 'asdf',
    b: 2
}

const keys = JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTEwOTAxMDQ1LCJleHAiOjE1MTIxOTcwNDV9.I1DCLqo_4MbkTtTrzGLw3Jh7HLkpsO9N5Cflcy6iJ6o')

console.log(JSON.parse(keys))

// let values
// for (const key of keys) {
//     values += `${key}'`
// }
// console.log(values)