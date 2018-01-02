var a = []
for (var i = 0; i < 10; i++) {
    a[i] = () => {
        // console.log(i)
    }
}

a[6]()

const b = []
b.push(1)
// console.log(b)
let d = ''
const c = 0
let aa = d || c
console.log(aa)