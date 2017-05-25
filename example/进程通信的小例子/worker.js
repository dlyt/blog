console.log('pid in worker:', process.pid)

process.on('message', function(msg) {
  console.log('主进程消息:', msg)
});

process.send('hi, 你是主进程么？');
process.emit('message', '子进程发消息了')