## 主要目的
梳理`HTTP`模块的逻辑
### 两个重要事件
#### connection
当连接建立时，观察者`connectionListener`处理`connection`事件。

### 流程
引入`http`模块

调用`http.createServer()`方法传入监听的回调函数，并监听端口。而`createServer`实际上只是做了实例化 _http_server 中的`Server`。

`http.Server`继承自`net`模块中的`Server`。`net.Server`会通过底层的`libuv`监听端口上的请求（猜的）,当请求来临之时，TCP 实例会触发`onconnection`事件。而且它还监听了两个事件`request`和`connection`。

`onconnection`事件会实例化`Socket`，然后触发`connection`事件，并将`Socket`传过去。`connection`事件的执行函数是`connectionListener`。

`connectionListener`会实例化`parser`来解析请求头。
1. `parserOnHeaders`: 不断解析推入的请求头数据。
2. `parserOnHeadersComplete`: 请求头解析完毕，构造 header 对象，为请求体创建`http.IncomingMessage`实例。
3. `parserOnBody`: 不断解析推入的请求体数据。
4. `parserOnExecute`: 请求体解析完毕，检查解析是否报错，若保存，直接触发`clientError`事件。若请求为 CONNECT 方法，或带有 Upgrade 头，则直接触发`connect` 或 `upgrade` 事件。
5. `parserOnIncoming`: 处理具体解析完毕的请求。

