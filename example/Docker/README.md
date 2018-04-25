### mongodb
首先，创建目录mongo,用于存放后面的相关东西。

    mkdir -p ~/mongo  ~/mongo/db
我们拉取官方的镜像,标签为3.2

    docker pull mongo:3.2
使用mongo镜像

    docker run -p 27017:27017 -v $PWD/db:/data/db -d mongo:3.2
命令说明：

-p 27017:27017 :将容器的27017 端口映射到主机的27017 端口

-v $PWD/db:/data/db :将主机中当前目录下的db挂载到容器的/data/db，作为mongo数据存储目录
### nginx 
docker run -p 80:80 --name mynginx -v /Users/simple/Desktop/gitlab/website/static:/www -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -d nginx 

挂载ip地址

### 加速
https://www.daocloud.io/

### 想要删除untagged images，也就是那些id为<None>的image的话可以用
```bash
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```
### 删除images，通过image的id来指定删除谁
```bash
docker rmi <image id>
```
### 构建镜像
```bash 
docker build -t <name> .
```
### 容器IP查询方法
```bash
docker inspect 容器ID或容器名 |grep '"IPAddress"'
```
### 进入容器
```bash
docker exec -it <id> /bin/bash
```