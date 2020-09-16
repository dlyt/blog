let arr = [1,3, {name: 22}]

let a2 = arr.concat();

a2[2].name = 11;

console.log(arr)