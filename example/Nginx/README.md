### 重启
```bash
nginx -s reload
```
### mac路径
/usr/local/etc/nginx/nginx.conf

### 跨域
if ($http_origin ~ "\.daoxila\.com") {
    add_header Access-Control-Allow-Origin $http_origin;
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Methods GET,PUT,POST,DELETE;
}