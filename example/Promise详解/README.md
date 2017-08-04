## 问答
### 什么是Promise?
一个容器，里面装着未来才会结束的事件的结果。
一个对象，可以获取异步操作的消息。
### Promise有什么特点？
- 有三种状态，不受外界影响。
- 状态一但改变就不再变，随时可以得到结果。
### Promise有几种捕获错误的方法？
- `then()`的第二个参数 
- `Promise.prototype.catch()`
### 上面二种方法有什么区别？
第二种方法可以捕获前面`then`方法执行中的错误，所以推荐使用第二种方法。

## 什么是Promise?
所谓Promise,简单说就是一个容器，里面保存着某个未来才会结束的事件的（通常是一个异步操作）的结果。

从语法上说，Promise是一个对象，从它可以获取异步操作的消息。
## Promise对象的两个特点
（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成）和Rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变成Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同
## Promise.prototype.then()
then方法返回的是一个新的Promise实例。
## Promise.prototype.catch()
Node 有一个 unhandleRejection 事件，专门监听未捕获的 reject 错误。
```js
process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
});
```
## Promise.prototype.then()
如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected,并不会触发 Promise.all() 的 catch 方法。
## Promise.race() 
```js
var p = Promise.race([p1, p2, p3])
```
只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。
## Promise.done()
Promise 对象的回调链，不管以 then 方法或 catch 方法结尾，要是最后一个方法抛出错误，都有可能无法捕获到（因为 Promise 内部的错误不会冒泡到全局）。因此，我们可以提供一个 done 方法，总是处于回调链的尾部，保证抛出的任何可能出现的错误。
## Promise.prototype.finally()
finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与 done 方法的最大区别，它接收一个普通回调函数作为参数，该函数不管怎样都必须执行。
