## 1. orm
- egg-mysql 
- egg-sequelize
#### 配置信息
```js
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'mysql.com',
    // 端口号
    port: '3306',
    // 用户名
    user: 'test_user',
    // 密码
    password: 'test_password',
    // 数据库名
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```
#### 使用方式
```js
await app.mysql.query(sql, values); 
```
## 2. 日志
egg-logger
- appLogger ${appInfo.name}-web.log，例如 example-app-web.log，应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它。
- coreLogger egg-web.log 框架内核、插件日志。
- errorLogger common-error.log 实际一般不会直接使用它，任何 logger 的 .error() 调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
- agentLogger egg-agent.log agent 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里。
## 3. 应用部署
#### 启动命令
```bash
$ egg-scripts start --port=7001 --daemon --title=egg-server-showcase
```
如上示例，支持以下参数：
- port=7001 端口号，默认会读取环境变量 process.env.PORT，如未传递将使用框架内置端口 7001。
- daemon 是否允许在后台模式，无需 nohup。若使用 Docker 建议直接前台运行。
- env=prod 框架运行环境，默认会读取环境变量 process.env.EGG_SERVER_ENV， 如未传递将使用框架内置环境 prod。
- workers=2 框架 worker 线程数，默认会创建和 CPU 核数相当的 app worker 数，可以充分的利用 CPU 资源。
- title=egg-server-showcase 用于方便 ps 进程时 grep 用，默认为 egg-server-${appname}。
- framework=yadan 如果应用使用了自定义框架，可以配置 package.json 的 egg.framework 或指定该参数。
- ignore-stderr 忽略启动期的报错。
- 所有 egg-cluster 的 Options 都支持透传，如 --https 等。