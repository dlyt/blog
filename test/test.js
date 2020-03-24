const unique = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; i < arr.length; j++) {
            console.log(2)
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                console.log(arr)
                // j--;
                // arr.length--;
            }
        }
    }
}



console.log(unique([1,2,3,4,4,1,1]))