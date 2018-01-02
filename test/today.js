var myDate = new Date();
const year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
const month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
const day = myDate.getDate(); //获取当前日(1-31)
// console.log(new Date(`${year}-${month + 1}-${day} 23:55:55:998`).getTime())
// console.log(new Date(`2017-11-6 10:00:00:000`).getTime())
console.log(myDate.getTime())
// console.log(myDate.getTime())
// console.log(myDate.getTime() - 24 * 60 * 60 * 1000)
// console.log(new Date(`${year}-${month + 1}-${day} 23:55:55:998`).getTime() - 24 * 60 * 60 * 1000)
function getLocalTime(nS) {   
    return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");    
}  

console.log(getLocalTime(1506764909000)); 
// console.log(getLocalTime(1500528880000)); 
// console.log(new Date(`2017-07-20T05:34:40.241Z`).getTime())
// console.log(new Date(`2017-07-20T05:34:40.241Z`).getHours())
// console.log(new Date(`2017-07-20T05:34:40.241Z`).getMinutes())
// console.log(new Date(`2017-07-20T05:34:40.241Z`).getSeconds())
// console.log(new Date(`2017-07-20T05:34:40.241Z`).getMilliseconds())
