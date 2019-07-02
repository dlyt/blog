var xlsx = require("node-xlsx");
let xlsxData = xlsx.parse("2.xlsx");
const request = require('request');

// const len = xlsxData[0].data.length;
// console.log(len)
let i = 1;

const sync = function (ip) {
    return new Promise((resolve, reject) => {
        let url = `http://freeapi.ipip.net/${ip}`;
        request(url, (err, res, body) => {
            const _body = JSON.parse(body);
            return resolve(_body)
        }) 
    });
};
function start() {
    if (i < 100) {
        // console.log(xlsxData[0].data[i])
        if (xlsxData[0].data[i][3]) {
            sync(xlsxData[0].data[i][3]).then(city => {
                console.log(xlsxData[0].data[i][2])
                console.log(city)
                i++
                start();
            }).catch(err => {
                console.log(err)
            })
        } else {
            i++
            start();
        }
    } else {
        console.log('喜宴酒店数据同步完成');
    }
}
// sync('220.243.136.247');
start()

