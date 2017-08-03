### express()
`express`实际上就是一个工厂函数，用来创建`app`,而`app`则就是`createServer`的回调函数。

因此，在使用 Express 的时候，事实上，所有的请求都是交给`app`，通过`app.handle`来交给`router.handle`来处理。

### 关键文件
- lib/application.js
- lib/express.js
- lib/request.js
- lib/response.js
- lib/router/route.js