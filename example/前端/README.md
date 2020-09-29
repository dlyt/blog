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
join() 指定分隔符分隔；

对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。
对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。

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

bind()返回的其实是一个函数，并不会立即执行。

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
            rel[key] = deepClone(obj[key]);
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

### 强制缓存
cache-control
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
    缓存
    DNS 解析：域名 => IP 地址；
    tcp 连接：
        客向服发送连接请求报文 syn包（同步序列码） seq = j；
        服务器接收客户端请求后回复ACK = j + 1, seq = k报文，并分配资源；
        客户端收到ACK报文后，也向服务端发送ACK = k + 1报文，并分配资源；
            TCP 使用三次握手建立连接的最主要原因是防止历史连接初始化了连接。
                一个「旧 SYN 报文」比「最新的 SYN 」 报文早到达了服务端；
                那么此时服务端就会回一个 SYN + ACK 报文给客户端；
                客户端收到后可以根据自身的上下文，判断这是一个历史连接（序列号过期或超时），那么客户端就会发送 RST 报文给服务端，表示中止这一次连接。
            同步双方初始序列号 3次就够了
            2次握手，会造成资源浪费
    浏览器根据 IP 地址向服务器发起 http 请求；
    服务器处理 http 请求，并返回给浏览器；
渲染过程：
    1，根据 HTML 代码生成 DOM Tree；根据 CSS 代码生成 CSSOM ；将 DOM Tree 和 CSSOM 整合形成 Render Tree；
    2. 根据 Render Tree 渲染页面；遇到 script 则暂停渲染，优先加载并执行 JS 代码，完成再继续；直至把 Render Tree 渲染完成；

### 为什么4次挥手
tcp是全双工通信
（1）第一次挥手     因此当主动方发送断开连接的请求（即FIN报文）给被动方时，仅仅代表主动方不会再发送数据报文了，但主动方仍可以接收数据报文。    

（2）第二次挥手     被动方此时有可能还有相应的数据报文需要发送，因此需要先发送ACK报文，告知主动方“我知道你想断开连接的请求了”。这样主动方便不会因为没有收到应答而继续发送断开连接的请求（即FIN报文）。   

（3）第三次挥手    被动方在处理完数据报文后，便发送给主动方FIN报文；这样可以保证数据通信正常可靠地完成。发送完FIN报文后，被动方进入LAST_ACK阶段（超时等待）。   

（4）第四挥手    如果主动方及时发送ACK报文进行连接中断的确认，这时被动方就直接释放连接，进入可用状态。

关闭连接时，当Server端收到FIN报文时，很可能并不会立即关闭SOCKET，

所以只能先回复一个ACK报文，告诉Client端，"你发的FIN报文我收到了"。

只有等到我Server端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。

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

### 防抖
持续触发事件，一定时间内没有在触发，事件函数才会执行一次。
```js
function debounce(fn, wait) {
    let timeout = null;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
            timeout = null;
        }, wait);
    }
}
```

### 节流
触发事件的时候，设置定时器，再次触发如果定时器存在，就不执行，直到 delay 时间后，定时器执行函数，并清空定时器；
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
event.stopPropagation()；e.cancelBubble = true；

event.preventDefault()；

### 函数声明和函数表达式的区别
函数声明 function fn() {}
函数表达式 const fn = function() {}
函数声明会在代码执行前预加载，而函数表达式不会

### new Object() 和 Object.create() 区别
{} 等同于 new Object() ，原型 Object.prototype
Object.create(null) 没有原型
Object.create({...}) 可指定原型

### 值类型和引用类型的区别
值类型：栈中存储。key: a，val：100；
引用类型：在栈和堆中储存。栈：key：a，val：内存地址；堆：key：内存地址，val：{ a: 20 }；
栈是从上往下叠加，堆是从下往上叠加。

### 浅拷贝 和 深拷贝
浅拷贝：
    Object.assign() 当 object 只有一层的时候，是深拷贝；
    Array.prototype.concat();
    Array.prototype.slice();
深拷贝：
    JSON.parse(JSON.stringify())
    手写递归方法
    lodash、cloneDeep()

### js 垃圾回收机制

### pm2 负载实现原理
问题：如果在执行I/O中遇到了阻塞就会降低整个应用的执行效率，导致CPU使用率高等不利原因。
单线程的好处：比如避免了线程同步或者死锁、状态同步等等之类的问题。

### TCP 和 UDP 的区别
TCP 是面向连接的，UDP 是无连接的即发送数据前不需要先建立链接。

可靠。

TCP 是面向字节流，UDP 面向报文。

TCP 首部20字节，UDP8字节

### options 请求
OPTIONS请求即预检请求，可用于检测服务器允许的http方法。当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起OPTIONS请求，即CORS预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求。

### https 实现原理
区别：明文 端口 ；缺点：成本、加载延时、缓存不高效。

客户端先要求服务器端建立 ssl 链接。

服务器端会将网站的证书（包含公钥）传输给客户端。

协商安全等级。

客户端建立会话秘钥，用公钥加密，返回给服务器端，服务器用私钥解密出会话秘钥。

通过会话秘钥加密与客户端之前的通信。

### 适配
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

### cookie、sessionStorage、localStorage
cookie 始终在同源的http请求中携带，可以限制cookie只属于某个路径下；

cookie 只有4k；

sessionStorage 仅在当前浏览器窗口关闭前有效；

localStorage 始终有效

### cookie 如何防范 xss 攻击
XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，减轻这些攻击，在头部配置 set-cookie = httponly secure

### cookie 和 session 的区别
http是一个无状态协议，因此Cookie的最大作用就是存储 sessionId 用来唯一标识；

### 一句话概括restful
用URL定位资源，用HTTP描述操作；

### click 在 ios 上有300ms延迟，原因及如何解决
原因：一次点击屏幕，浏览器无法立即判断出双击缩放还是单机操作，所以会等待300ms；

解决方案：
    禁用缩放`<meta name='viewport' content='width=device-width,user-scalable=no'>`；
    利用 FastClick，其原理：检测到 touchend 事件后，立即模拟 click 事件，并把浏览器300ms之后真正发出的事件给阻断掉；

### addEventListener 参数


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



可以自己带电脑，社保，电脑配置