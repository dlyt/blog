#### 查看端口占用
```bach
lsof -i:80
```

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

Promise（bluebird 高性能的原因）、Generator、Async、Co
Redis
mysql（优化）
mongodb（优化）
Express、Koa
跨域、token、session
设计模式
雪崩事件

JS面向对象的编程思想，继承，原型，闭包

## 支付宝上传图片
```js
var r = request.post('https://openapi.alipay.com/gateway.do?app_id=2018012502071504&charset=utf-8&format=json&image_name=%E5%88%B0%E5%96%9C%E5%95%A6&image_type=jpg&method=alipay.offline.material.image.upload&sign_type=RSA2&timestamp=2018-01-31%2010%3A28%3A07&version=1.0&sign=E%2FeIkAGRnX2r44XmwgGSDn0urW%2BZ5FQ8T9ieTkWJn5bPllOaP42L3e%2Fh8Ivryc4vFWKBZZXbJZ%2Fw%2FAysS0MUA0pZ%2BPNmuPzlSjcOwSuv2Wx30tF3HDdHb0euxYM%2BmNRDABVVpuLmPf0oqQSmOi5zTXC0Q7X0or1muuzbfIoo8lO6NcUITXgPvUYeiOzaxZt2t3WoDCje3s9ytXZ5RnJl6VoW%2B3LGJayh5qCUXNRZzrYK2a7nNZxjq0uO61C8A7AXj8HbjHdfKc3I9ujt%2FhlAxjZBgeGRgaT18tVvt%2F2L6MO2oygzomqvatMdqdf6abVj40SW%2F4qA%2FKIgHMn9Nw4Qnw%3D%3D', (err, httpResponse, body) =>  {
    console.log(body)
})

var form = r.form();

form.append('image_content', fs.createReadStream(__dirname + '/image2.jpg'), {filename: 'image2.jpg'});
```