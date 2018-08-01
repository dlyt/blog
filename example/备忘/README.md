#### 查看端口占用并杀死
```bach
lsof -i:80
```
```bach
kill -9 $(sudo lsof -i tcp:进程号 -t)
```
### 切换淘宝镜像
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

## 支付宝上传图片
```js
var r = request.post('https://openapi.alipay.com/gateway.do?app_id=2018012502071504&charset=utf-8&format=json&image_name=%E5%88%B0%E5%96%9C%E5%95%A6&image_type=jpg&method=alipay.offline.material.image.upload&sign_type=RSA2&timestamp=2018-01-31%2010%3A28%3A07&version=1.0&sign=E%2FeIkAGRnX2r44XmwgGSDn0urW%2BZ5FQ8T9ieTkWJn5bPllOaP42L3e%2Fh8Ivryc4vFWKBZZXbJZ%2Fw%2FAysS0MUA0pZ%2BPNmuPzlSjcOwSuv2Wx30tF3HDdHb0euxYM%2BmNRDABVVpuLmPf0oqQSmOi5zTXC0Q7X0or1muuzbfIoo8lO6NcUITXgPvUYeiOzaxZt2t3WoDCje3s9ytXZ5RnJl6VoW%2B3LGJayh5qCUXNRZzrYK2a7nNZxjq0uO61C8A7AXj8HbjHdfKc3I9ujt%2FhlAxjZBgeGRgaT18tVvt%2F2L6MO2oygzomqvatMdqdf6abVj40SW%2F4qA%2FKIgHMn9Nw4Qnw%3D%3D', (err, httpResponse, body) =>  {
    console.log(body)
})

var form = r.form();

form.append('image_content', fs.createReadStream(__dirname + '/image2.jpg'), {filename: 'image2.jpg'});
```



技术基础
操作系统
磁盘文件相关基础，文件描述符，文件打开选项等
进程,线程基本概念，进程创建销毁通讯等，线程创建同步等
基本的同步原语，信号量，条件变量，锁等
Socket 基础接口
数据结构/算法/设计模式
线性表(数组，链表)，Hash表，树
排序，遍历，查找等
观察者，生产者消费，单例等
网络基础(TCP,HTTP等)
TCP/UDP 概念与区别，典型运用场景
HTTP 报文介绍，常用状态码
CDN 等网络代理的工作原理
Node.js 基础
详述 Node.js 并发原理(libuv工作机制)
核心 API 的实现架构(如何 binding 到 V8)
编程语言(JS/Java/C++)
OOP (其他实在不知道问啥)
项目开发
研发流程: 完整的研发流程是怎样的？需求，编码到发布和运维。
运维管理: 运维体系是如何做的？有实践过 DevOps 吗？
项目管理: 项目开发运用何种管理方式？有实践过 Agile / Scrum 吗？
拓展思考
当前所做项目，流量扩大10倍，该如何应对？
如何提升手头项目的研发效率？
如果，你合作的同事数量扩大10倍，该如何提升协作效率？
开源社区
你参与开源社区吗？
你有发起过开源项目吗？
参与了什么项目？
运作流程是怎样的？

1、1年以上Node.js开发经验；
2、熟练掌握http、net、file system模块中的对象及方法；
3、熟悉Express、Mongoose中的概念与API调用；
4、了解promise ，co等异步控制方法，并知晓其原理
5、熟悉MongoDB库以及NoSQL语法, 熟悉Mysql； 
6、熟悉Linux服务器；

为什么想来阿里？

个人做的最成功最有挑战的事情是什么？

工作中最难忘的经历？

对加入我们团队有何期待？


 热爱编程，有良好的自学能力和主观能动性。 为人谦虚温和，善于团队合作


 promise, 跨域, 版本升级, 日志, 部署.