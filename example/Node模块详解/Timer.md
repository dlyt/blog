### setInterval 和 setImmediate
setInterval 的实现总体和 setTimeout 很相似，区别在于对注册的回调函数进行了封装，在链表的尾部重新插入

而 setImmediate 和 setTimeout 实现上的主要区别则在于，它会一次性将链表中注册的，都执行完

所以作为功能类似的 process.nextTick 和 setImmediate ，在功能层面上看，每次事件循环，它们都会将存储的回调都执行完，但 process.nextTick 中的存储的回调，会先于 setImmediate 中的执行