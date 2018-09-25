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
        result[index] = arr[index][i]
        if (index != arr.length - 1) {
            // results.push(result.join(','))
            doExchange(arr, index + 1)
        } else {
            // console.log(getGroup(result))
            results.push(result.join('-'))
            getGroup(result).forEach(item => {
                results.push(item)
            });
        }
    }
}

results = new Set(results)
console.log(results.length)
 
function getGroup(data, index = 0, group = []) {
	var need_apply = new Array();
	need_apply.push(data[index]);
	for(var i = 0; i < group.length; i++) {
		need_apply.push(group[i] + '-' + data[index]);
	}
	group.push.apply(group, need_apply);
 
	if(index + 1 >= data.length) return group;
	else return getGroup(data, index + 1, group);
}
 

// console.log(getGroup(data));