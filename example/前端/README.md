```js
//适配
var $that = $(window), base_data;
var winW = $that.width();
var winH = $that.height();
$that.on("resize", function () {
    $("html").css("fontSize", $that.width() / 6.4);
    // 获取屏幕尺寸宽高
    if (winH / winW <= 1.6 && winH / winW > 1) {
        $("html").css("fontSize", (winH / 1206) * 100 + "px");
    }
}).resize();
```

https://bigqianduan.top/libs/cjm.html

### 什么是渐进式框架
### z-index失效的几种情况
失效的情况:

1、父标签 position属性为relative；

2、问题标签无position属性（不包括static）；

3、问题标签含有浮动(float)属性。

4、问题标签的祖先标签的z-index值比较小



解决方法:

第一种:  position:relative改为position:absolute；

第二种:浮动元素添加position属性（如relative，absolute等）；

第三种:去除浮动。

第四种:提高父标签的z-index值

### JavaScript 如何工作：对引擎、运行时、调用堆栈的概述


### 闭包
闭包就是能够读取其他函数内部变量的函数

函数作为参数被传递
函数作为返回值被返回

自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方；

变量会常驻内存，得不到释放

应用：
    闭包隐藏数据，只提供 API
```js
// 创建 10 个 `<a>` 标签，点击的时候弹出对应的序号
let i, a
for (i = 0; i < 10; i++) {
    a = document.createElement('a');
    a.innerHTML = i + '<br>';
    a.addEventListener('click', function (e) {
        e.preventDefault();
        alter(i)
    });
}
// 每次都是 10 
let i = 0；
```
```js
function create() {
    let a = 100;
    return function () {
        console.log(a)
    }
}

let fn = create();
let a = 200;

fn()
```
```js
function create() {
    let a = 200;
    fn();
}
let a = 100;
function fn() {
    console.log(a)
}
print(fn)
```

定时器
```js
function wait(message) {
    setTimeout(function timer() {
        console.log(message)
    }, 1000);
}

wait('定时器');
```

事件监听器
```js
function test() {
    let a = 0;
}
```

### 数组
.of()；.from()；
arr.filter(() => {}) 筛选出符合多个条件的对象数组中的一些元素，组成新数组或者是直接覆盖原数组
arr.find(() => {}) 找到第一个符合条件的，直接返回
findIndex()
keys()
includes()
values()
arr.reduce((total, num) => { return total + num })
### call 和 apply 的区别
fn.call(this, p1, p2, p3)
fn.apply(this, arguments)

bind 和 call 的区别，bind 会返回一个新的函数来执行；
### 手写深拷贝
```js
function deepClone(obj = {}) {
    // obj == null 相当于 obj === null || obj === undefined
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let rel 
    if (obj instanceof Array) {
        rel = []
    } else {
        rel = {}
    }
    for (let key in obj) {
        // 保证 key 不是原型属性
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key]);
        }
    }
    return {}
}
```

### 原型和原型链
原型关系：
    每个 class 都有显示原型 prototype；
    每个实例都有隐式原型 __proto__
    实例的 __proto__ 指向对应 class 的 prototype
基于原型的执行规则：
  获取属性和执行方法时，
    先在自身属性和方法寻找
    如果找不到则自动去 __proto__ 中查找

### 手写 JQuery
extends

### this 
this 取值是在函数执行的时候确认的，不是在定义的时候确认的
箭头函数的 this 取值是取上级作用域的值

### 手写 bind 函数
```js
Function.prototype.bind = function () {
    // 将参数拆解成数组
    const args = Array.prototype.slice.call(arguments);
    // 获取this
    const t = args.shift();
    const self = this;
    return function () {
        return self.apply(t, args)
    }
}
```

### 异步
解决单线程等待的问题

### event loop
JS 是单线程运行的
异步要基于回调来实现
event loop 就是异步回调的实现原理

每次 call stack 清空，即同步任务执行完；都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染；然后再去触发下一次 Event Loop；

### 宏任务和微任务
宏任务：setTimeout，setInterval，Ajax，DOM事件；DOM 渲染后触发；由浏览器规定的；
微任务：Promise，Async/await；DOM 渲染前触发；由 ES6 语法规定的；

微任务执行时机比宏任务早

### 事件代理
代码简洁；减少浏览器内存使用；

### 事件冒泡
基于 DOM 树形结构；事件会顺着触发元素往上冒泡；应用场景：事件代理；

### jsonp
script 可绕过跨域限制；

### cache-control
max-age 缓存时间；no-cache 不强制缓存，交给服务端处理；no-store 不缓存，服务端也不缓存；

### 协商缓存
服务器判断客户端资源，是否和服务端资源一样；
一致返回304，否则返回200和最新的资源；
根据资源标识判断；
资源标识：
    在 Response Headers 中，Last-Modified 资源的最后修改时间，Etag 资源的唯一标识；

### Last-Modified 和 Etag
会优先使用 Etag；
Last-Modified 只能精确到秒级；
如果资源被重复生成，而内容不变，则 Etag 更精确；

### 页面加载
资源形式：
    html 代码
    媒体文件，图片，视频
    js，css
加载过程：
    DNS 解析：域名 => IP 地址；
    浏览器根据 IP 地址向服务器发起 http 请求；
    服务器处理 http 请求，并返回给浏览器；
渲染过程：
    1，根据 HTML 代码生成 DOM Tree；根据 CSS 代码生成 CSSOM ；将 DOM Tree 和 CSSOM 整合形成 Render Tree；
    2. 根据 Render Tree 渲染页面；遇到 script 则暂停渲染，优先加载并执行 JS 代码，完成再继续；直至把 Render Tree 渲染完成；

### 前端性能优化
让加载更快：
    减少资源体积：压缩代码；
    减少访问次数：合并代码，SSR 服务器端渲染，缓存；
    CDN;
让渲染更快：
    CSS 放在 head，JS 放在 body 最下面；
    尽早开始执行 JS，用 DOMContentLoaded 触发； 
    懒加载；
    对 DOM 查询进行缓存；
    合并插入 DOM 结构；
    节流 throttle 防抖 debounce

### 节流
```js
function throttle (fn, delay = 100) {
    let timer = null
    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
}

div1.addEventListener('drag', throttle(function() {}, 100));
```

### var 和 let const 的区别
var 有变量提升；var 和 let 是变量，可修改；const 是常亮，不可修改；let const 有块级作用域，var 没有；

### typeof 能判断哪些类型
undefined string number boolean symbol   object(typeof null === 'object')  function 

### 强制类型转换和隐式类型转换
强制：parseInt parseFloat toString
隐式：if、逻辑运算符、==、+ 拼接字符串

### 纯函数
1. 函数的返回结果只依赖于它的参数。
2. 函数执行过程里面没有副作用。

### 阻止事件冒泡和默认行为
event.stopPropagation()；event.preventDefault()；

### 函数声明和函数表达式的区别
函数声明 function fn() {}
函数表达式 const fn = function() {}
函数声明会在代码执行前预加载，而函数表达式不会

### new Object() 和 Object.create() 区别
{} 等同于 new Object() ，原型 Object.prototype
Object.create(null) 没有原型
Object.create({...}) 可指定原型