#### 查看端口占用
```bach
lsof -i:80
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

