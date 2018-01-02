const aPromise = new Promise(function (res, rej) {
    setTimeout(function() {
        res(11)
    }, 1000);
})
const bPromise = new Promise(function (res, rej) {
    setTimeout(function() {
        res(2)
    }, 1000);
})

function start() {
    let d
    aPromise
    .then(a => {    
        d = a
        return bPromise
    })
    .then(b => {
        console.log(d)
    })
    .catch(err => {
        console.log(err)
    })
    // return new Promise((resolve, reject) => {
    //     let _a,_b 
    //     aPromise
    //         .then(a => {    
    //             _a = a
    //             return bPromise
    //         })
    //         .then(b => {
    //             return resolve(_a)
    //         })
    //         .catch(err => {
    //             return reject(err)
    //         })
    // })
    
}
start()
    // .then(d => {
    //     console.log(d)
    // })
    // .catch(err => {
    //     console.log(err)
    //     return err
    // })

// const Promise = require('bluebird')
// const aPromise = new Promise(function (res, rej) {
//     setTimeout(function() {
//         res(2)
//     }, 1000);
// })
// aPromise.then( (d) => {
//     console.log(d)
// })
// console.log(aPromise)

// var INTERNAL = function(){};
// var executor = function () {}
// console.log(executor === INTERNAL)