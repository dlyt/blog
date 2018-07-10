const reg = /^<.*"="">$/

const phone = '<p style="font-family:" color:#565556;"="">'

console.log(reg.test(phone))

var str=`1<span style="font-size:14px;line-height:22.4px;color:#4C4C4C;font-family:" background-color:#f8f8f8;"="">2`
console.log(str.replace(/<.*"="">/, ""))



