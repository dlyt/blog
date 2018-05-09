const a = [
    {
        a: 2
    },
    {
        a: 1
    },
    {
        a: 1
    },
    {
        a: 1
    }
]

for (let i = 0; i < a.length; i++) {
    if (a[i].a === 2) {
        a.splice(i,1)
    }
}

console.log(a)