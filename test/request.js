const request = require('request')
let j = request.jar();
const url = 'http://www.daoxila.com/GongJu/lottery?city=7';
const options = {
    url: encodeURI(url),
    method: 'GET',
    jar: j
}
j.setCookie(request.cookie(`PHPSESSID=ca6pj3K7yppD0NkBIHy-kiwVdg`), url, function (){});

let a = 0;

const start1 = () => {
    if (a < 200) {
        request(options, function (err, res, body) {
            if (err) {
               console.log(err)
            }
            if (body) {
                console.log(body)
                a++
                start1()
            }
        })
    }
}

start1()

// let b = 0;

// const start2 = () => {
//     if (b < 200) {
//         request(options, function (err, res, body) {
//             if (err) {
//                console.log(err)
//             }
//             if (body) {
//                 console.log(body)
//                 b++
//                 start2()
//             }
//         })
        
//     }
// }

// start2()

// let c = 0;

// const start3 = () => {
//     if (c < 100) {
//         request(options, function (err, res, body) {
//             if (err) {
//                console.log(err)
//             }
//             if (body) {
//                 console.log(body)
//                 c++
//                 start3()
//             }
//         })
        
//     }
// }

// start3()


