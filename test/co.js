const co = require('co')

co(function*() {
    setTimeout(function() {
        console.log(1)
    }, 100);
    console.log(2)
}).catch(err => {
    
})

