function copyArray(source, array) {
  let index = -1
  const length = source.length

  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

var arr = [0,1,2,3,4,5,6,7,8,9];
var res = [0,0,0,0,0,0,0,0,0,0];

var t = 10000;
for(var i = 0; i < t; i++){
  var sorted = shuffle(arr.slice(0));
  sorted.forEach(function(o,i){
    res[i] += o;
  });
}

res = res.map(function(o){
  return o / t;
});

console.log(res);

