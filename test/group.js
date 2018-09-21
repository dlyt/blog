var arr = [
    ['a', 'b'],
    ['1', '2', '3'],
    ['x', 'y'],
]
var results = [];
var result = [];
doExchange(arr, 0);
function doExchange(arr, index){
    for (var i = 0; i < arr[index].length; i++) {
        result[index] = arr[index][i];
        console.log(result[index])
        if (index != arr.length - 1) {
            // results.push(result.join(','))
            doExchange(arr, index + 1)
        } else {
            results.push(result.join(','))
        }
    }
}

console.log(results);
