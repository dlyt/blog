let crypto = require("crypto");
const time = new Date().getTime()
console.log(time)
let sha1 = crypto.createHash('sha1');
// let hString = time + "dxl:www.daoxila.com";
// let hString = time + "d29c9a5f2cadab52cc2b746e680e5b8f42ced655";
let hString = time + "dxl:www.daoxila.com" + '18840822922';
// let hString = time + "phone=71010401221&status=1&addtime=1498215998&service=1&remarks=cs&price=1000" + 'd29c9a5f2cadab52cc2b746e680e5b8f42ced655';
// hString += '18840822822'
sha1.update(hString);
let h1 = sha1.digest('hex'); 
console.log(h1)

// const CryptoJS = require('crypto-js')
// console.log(CryptoJS.SHA1(hString).toString(CryptoJS.enc.Hex))
// let _sha1 = _crypto.createHash('sha1');
// _sha1.update(hString);
// console.log(_sha1.digest('hex'))
// const dightFixed = function(val, dight){  
//     val = Math.round(val/Math.pow(10,dight)) * Math.pow(10,dight);  
//     return val;  
// }

// console.log(Math.round(new Date().getTime() / 1000))
// console.log(parseInt((new Date).getTime()))

// function getLocalTime(nS) {   
//     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");    
// }   


