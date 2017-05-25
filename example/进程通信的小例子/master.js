let childprocess = require('child_process')
let worker = childprocess.fork('./worker.js')   // 要在子进程中运行的模块

console.log('pid in master:', process.pid)

worker.on('message', function(msg) {
  console.log('子进程发的消息:', msg);
})
worker.send('hi，我是主进程。');
process.on('message', function(msg) {
  console.log('接收主进程消息:', msg);
})

process.emit('message', '我发消息了')