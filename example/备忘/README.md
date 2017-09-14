### 切换淘宝镜像
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

async await 内部机制 await 干什么的？

Promise 内部实现机制

为什么选择 Token， 与 Seesion 区别?
　　
Session 怎么识别用户？

怎么做 Token 延时的？

为什么用 MongoDB ？ MongoDB 和 MySQL 的存储方式有什么区别？

跨域的解决方案
问怎么处理 options 预检请求

let 与 var 的区别

let 不会有作用域提升现象，所以使用 let 会有TDZ错误。
let 一般与 {} 块联合使用，即在块中使用 let 声明的变量只在块中有效，在外面不能进行访问。
let 与 for 联合使用的时候，因为 let 声明的变量只在块中有效，所以每一次循环当中都会声明一个新的循环变量。（这里还需要注意，for 循环当中，循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域）
let 不允许重复声明。

Promise（bluebird 高性能的原因）、Generator、Async、Co
Redis
mysql（优化）
mongodb（优化）
Express、Koa
跨域、token、session
设计模式
雪崩事件
