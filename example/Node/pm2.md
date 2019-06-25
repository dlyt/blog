服务器代码部分
// 服务端口
const port = 30118;
const pm2AppInstance = (process.env.NODE_APP_INSTANCE || ''); // 如果是通过pm2启动则有一个字符串数字编号
const server = http.createServer(app);  // 
server.listen(port, function () {
    console.log(pm2AppInstance, 'server run on:', server.address());
    if (pm2AppInstance !== '') {
        process.send('ready'); // 在数据库等资源连接成功、服务器监听端口后通知pm2 app ready
    }
})

function exit(code, ms) {
    // server.keepAliveTimeout 默认5秒，等待长连接关闭
    ms += server.keepAliveTimeout;
    setTimeout(() => {
        console.error(`-------------------------------->>>>>> server ${pm2AppInstance} exit with [${code}]`);
        process.exit(code);
    }, ms);
}

process.on('SIGINT', () => {
    console.info('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! --->>> SIGINT signal received.', pm2AppInstance)
    // 停止接受新的连接并完成已有连接
    server.close(function (err) {
        if (err) {
            console.error('>>>>>>>>>>>>>>>>>>>>>>>>>server.close() err:', err);
            exit(1, 1000);
            return;
        }
        // 关闭其它资源
        mongoose.disconnect().then(function () {
            console.log('========================>>> server close all ok.', pm2AppInstance);
            exit(0, 1000);
        }).catch(function (err) {
            console.error('>>>>>>>>>>>>>>>>>>>>>>>>>sigint err:', err)
            exit(2, 1000);
        })
    })
})
PM2配置
// pm2 启动配置，文件名必需以.config.js结尾
// 当前pm2版本为3.5.0，每次pm2 start x.config.js或pm2 reload xxx 可以平滑的停机和更新代码，以及这里修改的环境变量会生效（没有测试其它配置的更新不知道会不会生效）
// pm2 stop / delete也可以平滑停机
// windows没测试
module.exports = {
    apps: [
        {
            name: "xxx",
            script: "./app.js",
            // instances: 1,
            instances: 'max',
            exec_mode: "cluster",  // 没有测试其它模式
            restart_delay: 1000 * 10, // 10s
            // error_file: "/mnt/logs/e.log",
            // out_file: "/mnt/logs/o.log",

            kill_timeout: 1000 * 60 * 3, // pm2 stop 将在此毫秒数后发送SIGKILL信号
            wait_ready: true, // 设置为true打开pm2接收ready信号 
            listen_timeout: 1000 * 15, // 如果此ms后仍未收到ready信号pm2将认为app ready
            merge_logs: true, // 合并cluster各进程的日志
            env: {
                NODE_ENV: "product",
            },
        },
    ]
}