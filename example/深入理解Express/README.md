### express()
`express`实际上就是一个工厂函数，用来创建`app`,而`app`则就是`createServer`的回调函数。

因此，在使用 Express 的时候，事实上，所有的请求都是交给`app`，通过`app.handle`来交给`router.handle`来处理。
### 关键文件
- lib/application.js
- lib/express.js
- lib/request.js
- lib/response.js
- lib/router/route.js
### 请求处理流程
当客户端发送一个http请求后，会先进入express实例对象对应的router.handle函数中，router.handle函数会通过next()遍历stack中的每一个layer进行match，如果match返回true，则获取layer.route，执行route.dispatch函数，route.dispatch同样是通过next()遍历stack中的每一个layer，然后执行layer.handle_request，也就是调用中间件函数。直到所有的中间件函数被执行完毕，整个路由处理结束。

`Layer.prototype.handle_request`中执行。

`Layer.prototype.handle_request`在`Route.dispatch()`中调用的。

`Route.dispatch()`作为`Layer`的一个属性。

`Layer`被 push 进`Router.stack`中。

`Layer`在`router.use(fn)`中实例化，回调函数是在实例化的时候传入的。

`Router`在`app.lazyrouter()`中实例化，赋值给`app._router`。
### app.use('/', fn)和app.get('/', fn)的区别
`Layer`中的`route`不同