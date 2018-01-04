const obj = Object.create(null);
console.log(obj)

const params = {
    id: 1,
    idd: 2
}
const columns = Object.keys(params);
const values = Object.keys(params).map(function(key) {
    return params[key];
});;
console.log(values)