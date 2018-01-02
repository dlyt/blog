// const today = new Date();
// const year = today.getFullYear().toString();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const d = `${year.substring(year.length - 2)}${month}${day}`;
// console.log(d)
const params = {
    id: 1,
    idd: 2
}
const columns = Object.keys(params);
const values = Object.keys(params).map(function(key) {
    return params[key];
});;
console.log(values)