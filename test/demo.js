console.log(2)
setTimeout(() => {
    console.log(1)
});
Promise.resolve().then(() => {
    console.log(4)
})
console.log(3)