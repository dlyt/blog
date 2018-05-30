比如监控的是8000端口
lsof -i:8000

#或加个tcp查找tcp服务
lsof -i tcp:8080

#找到对应的端口后kill掉
kill -9 900