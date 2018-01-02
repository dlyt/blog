class Queue {
    constructor(items) {
        this.items = items || []
    }

    addqueue(element) {
        this.items.push(element)
    }

    get size() {
        return this.items.length
    }

    log() {
        console.log(this.items)
    }
}

function log(x) {
    return new Promise((resolve, reject) => {
        resolve({code: 1})
    })
}
const queue = new Queue()
for (let i = 0; i < 5; i++) {
    queue.addqueue(log(i))
}
console.log(queue.size)
queue.log()