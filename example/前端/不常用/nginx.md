# user root wheel;
worker_processes auto;

events {
worker_connections 1024;
}

http {
include mime.types;
default_type application/octet-stream;

sendfile on;
keepalive_timeout 65;
server_names_hash_bucket_size 64;
server {
listen 80;
server_name s5.dxlfile.com;
location / {
proxy_pass http://127.0.0.1:8080;
}
}

# tool
server {
listen 80;
server_name www2.daoxila.com;
location / {
proxy_pass http://127.0.0.1:8010;
}
}
server {
listen 80 default;
server_name www.iyy.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:3000;
}
}
#
# test
# server {
# listen 80 default;
# server_name www.hw.mangofun.cn;
# location / {
# proxy_set_header X-Real-IP $remote_addr;
# proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
# proxy_set_header Host $http_host;
# proxy_set_header X-NginX-Proxy true;
# proxy_set_header Connection "";
# proxy_http_version 1.1;
# proxy_pass http://192.168.22.203:3000;
# }

# location /sub {
# proxy_set_header X-Real-IP $remote_addr;
# proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
# proxy_set_header Host $http_host;
# proxy_set_header X-NginX-Proxy true;
# proxy_set_header Connection "";
# proxy_http_version 1.1;
# proxy_pass http://192.168.22.203:3001;
# }
# location /static {
# proxy_set_header X-Real-IP $remote_addr;
# proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
# proxy_set_header Host $http_host;
# proxy_set_header X-NginX-Proxy true;
# proxy_set_header Connection "";
# proxy_http_version 1.1;
# proxy_pass http://192.168.22.203:3001;
# }
# }
# go
server {
listen 80;
server_name studygolang.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:8088;
}
}
# public
server {
listen 80;
server_name n.daoxila.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:3332;
}
}
# 会员中心
server {
listen 80;
server_name my.daoxila.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:3347;
}
}
# 后台
server {
listen 80;
server_name ww.daoxila.com;
location / {
proxy_pass http://192.168.22.203:8080;
}
location /api {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:3613;
}
}
# buy
server {
listen 80;
server_name buy.daoxila.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:3340;
}
}
# cosmo
server {
listen 80;
server_name admin.cosmoevents-bride.com;
# location / {
# proxy_pass http://192.168.22.203:8080;
# }
location /back {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:4000;
}
}

server {
listen 80;
server_name www.cosmoevents-bride.com m.cosmoevents-bride.com;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Connection "";
proxy_http_version 1.1;
proxy_pass http://192.168.22.203:4000;
}
}

# server {
# listen 80;
# server_name m.daoxila.com;
# location / {
# proxy_set_header X-Real-IP $remote_addr;
# proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
# proxy_set_header Host $http_host;
# proxy_set_header X-NginX-Proxy true;
# proxy_set_header Connection "";
# proxy_http_version 1.1;
# proxy_pass http://192.168.22.203:3333;
# }
# }

server {
listen 80;
server_name s.cosmoevents-bride.com;
location / {
root /www;
index index.html index.htm;
expires max;
add_header Access-Control-Allow-Origin *;
}
}
    server {
        listen 80;
        server_name eventdev.daoxila.com;
        location / {
            root /Users/yangyss/Desktop/gitlab/static/event;
            index index.html index.htm;
            expires max;
            add_header Access-Control-Allow-Origin *;
        }   
}

# server {
# listen 80;
# server_name s5.dxlfile.com;
# location / {
# root /Users/simple/Desktop/gitlab/static/question/build;
# index index.html index.htm;
# expires max;
# add_header Access-Control-Allow-Origin *;
# }
# }
}