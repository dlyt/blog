### 创建子进程
- spawn()启动一个子进程来执行命令
- exec()启动一个子进程来执行命令, 带回调参数获知子进程的情况, 可指定进程运行的超时时间
- execFile()启动一个子进程来执行一个可执行文件, 可指定进程运行的超时时间
- fork() 与spawn()类似, 不同在于它创建的node子进程只需指定要执行的js文件模块即可
### 传递的过程
主进程：

传递消息和句柄。
将消息包装成内部消息，使用 JSON.stringify 序列化为字符串。
通过对应的 handleConversion[message.type].send 方法序列化句柄。
将序列化后的字符串和句柄发入 IPC channel 。
子进程

使用 JSON.parse 反序列化消息字符串为消息对象。
触发内部消息事件（internalMessage）监听器。
将传递来的句柄使用 handleConversion[message.type].got 方法反序列化为 JavaScript 对象。
带着消息对象中的具体消息内容和反序列化后的句柄对象，触发用户级别事件。