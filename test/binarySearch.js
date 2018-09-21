function binarySearch(target,arr) {
    var start = 0;
    var end = arr.length - 1;

    while (start <= end){
        var mid = parseInt(start + (end - start) / 2);
        // console.log(mid)
        if (target == arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    console.log(start)
    console.log(end)
    return -1;
}

binarySearch(25, [0, 25, 50, 70, 90, 100])