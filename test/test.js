function getNo(id, len){
    let m = 0;
    let i = '';
    while (m < len) {
        i = i + '0'
        m++
    }
    id = i + id;
    return id.substring(id.length - len, id.length);
}

const num = '10';
let i = 1;

while (i <= num) {
    console.log(getNo(i, num.length))
    i++;
}