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