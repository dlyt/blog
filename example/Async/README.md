### async 函数对 Generator 函数的改进
（1）内置执行器
（2）返回值是 Promise
`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。
### 语法
`async`函数返回一个 Promise 对象

正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即 `resolve`的 Promise 对象。

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行。

另一种方法就是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误。
### 实现原理
就是将 Generator 函数和自动执行器，包装在一个函数里。