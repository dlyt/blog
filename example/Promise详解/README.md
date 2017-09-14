## 问答
### 什么是Promise?
一个容器，里面装着未来才会结束的事件的结果。
一个对象，可以获取异步操作的消息。
### Promise有什么特点？
- 有三种状态 `Pending`(进行中)、`Fulfilled`(已成功)和`Rejected`(已失败)，不受外界影响。
- 状态一但改变就不再变，随时可以得到结果。
### Promise有几种捕获错误的方法？
- `then()`的第二个参数 
- `Promise.prototype.catch()`
### 上面二种方法有什么区别？
第二种方法可以捕获前面`then`方法执行中的错误，所以推荐使用第二种方法。
### Promise 处理并发
Promise.all()、Promise.map()
### Promise 具体流程？ 
1.实例化一个最初的`Promise`对象，设置最初的状态为`Pending`。

2.通过`then`方法，创建一个新的`Promise`对象，由于上一级`Promise`暂时处于`Pending`状态，当前`then`方法的`onFulfilled`函数和新`Promise`的`resolve`方法放到上一级`Promise`的`deferreds`数组中。

3.这样就形成这样一个画面：第一个`Promise`被实例化，调用`then`方法。`then`会返回一个新的`Promise`对象，在上一个`then`方法的基础上继续通过新的`Promise`的`then`，形成一条调用链。每一个被创建出来的新的`Promise`的`resolve`都将传给上一级的`Promise`的`deferreds`数组来维护。

4.在第一个`Promise`对象的回调函数中执行异步操作，完成后调用`Promise`的`resolve`方法。

5.`resolve`允许传入一个参数，该参数的值通过`Promise`内部的`_value`变量维护。`resolve`会把`Promise`的状态修改为`fulfilled`，然后异步调用`handle`依次处理`deferreds`数组中的每一个`deferred`。

6.此时第一个`Promise`的状态在上一步中被改为`fulfilled`，于是`handle`主要完成的工作是，执行`deferred`的`onFulfilled`函数，并调用下一个`Promise`的`resolve`方法。

7.下一个`Promise`的`resolve`在上一级被执行成功后，同样会将状态切换到`fulfilled`，重复步骤6直到结束。
### 为什么使用第三方库中 Promise?
- 更快
- 更多好用的方法
### Bluebird 高性能的原因
- 函数中对象分配最小化
- 减少对象体积
- 可选特性懒重写
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

## Bluebird 详解

### Promise.map()
遍历一个数组或者一个数组的promise，对每一个元素使用mapper函数（参数依次为item、idnex、arrayLength）。

如果任何一个promise实例执行失败，则返回状态为reject的Promise实例。

还可以用于替代`数组.push + Promise.all`
### 函数 Promise 化
Promise化是指将一个不符合promise规范的API改造成返回promise的API。

在Node.js中，通常的做法是使用`promisify`来包装非Promise对象，然后就可以使用符合promise规范的方法了。