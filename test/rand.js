const randomNum = (n) => {
    let t = '';
    for(let i = 0;i < n;i++){ 
        t += Math.floor(Math.random() * 10); 
    }
    return t;
}
console.log(randomNum(4))