docker run -p 8080:8080 --name="test" -d web-app
docker run -p 3030:3030 -v `pwd`:/go/src/web-app --name="test" -d web-app
http://localhost:3030/World