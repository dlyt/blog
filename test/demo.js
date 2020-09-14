// new Promise((res, rej) => {
//     console.log('a')
//     res('b')
// }).then(console.log)

// Promise.resolve().then(console.log('c'))


let v = new Promise(resolve => {
    console.log("begin");
    resolve("then");
});

new Promise(resolve => {
    // console.log(v)
    resolve(v); // 微 1
}).then((v) => {
    console.log(v)
});


// Promise.resolve(v).then((v)=>{
//     console.log(v)
// });


new Promise(resolve => {
    console.log(1);
    resolve(); // 微2
})
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(4);
    });