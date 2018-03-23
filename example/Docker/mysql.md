## 拉取官方的镜像
docker pull mysql:5.6
## 运行容器
docker run -p 3306:3306 --name mymysql -v $PWD/logs:/logs -v $PWD/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6