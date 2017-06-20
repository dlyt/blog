# 使用Apache HTTP server benchmarking tool进行压力测试
ab -n 1000 -c 100  http://www.daoxila.com/HunYan/app

 -n requests     Number of requests to perform

在测试会话中所执行的请求个数。默认时，仅执行一个请求
-c concurrency Number of multiple requests to make
一次产生的请求个数。默认是一次一个。 

参数说明
Server Software         （Web主機的作業系統與版本）

Server Hostname         （Web主機的IP位址)

Server Port             （Web主機的連接埠(Port)）

Document Path           （網址的路徑部分）

Document Length         （網頁回應的網頁大小）

Concurrency Level       （同時進行壓力測試的人數）

Time taken for tests    （本次壓力測試所花費的總秒數）

Complete requests       （完成的要求數(Requests)）

Failed requests         （失敗的要求數(Requests)）

Total transferred       （本次壓力測試的總數據傳輸量(包括 HTTP Header 的資料也計算在內)）

HTML transferred        （本次壓力測試的總數據傳輸量(僅計算回傳的 HTML 的資料)）

Requests per second     （平均每秒可回應多少要求）

Time per request        （平均每個要求所花費的時間(單位: 豪秒)）

Time per request        （平均每個要求所花費的時間，所有同時連線數的平均值(單位: 豪秒)）

Transfer rate           （從 ab 到 Web Server 之間的網路傳輸速度）

Connection Times (ms)   （壓力測試時的連線處理時間）

下面的表格
橫軸欄位的部分：

min:      最小值

mean:     平均值(正、負標準差)

median:   平均值(中間值)

max:      最大值

縱軸欄位的部分：

Connect:       從 ab 發出 TCP 要求到 Web 主機所花費的建立時間。

Processing:    從 TCP 連線建立後，直到 HTTP 回應(Response)的資料全部都收到所花的時間。

Waiting:       從發送 HTTP 要求完後，到 HTTP 回應(Response)第一個 Byte 所等待的時間。

Total:         等於 Connect + Processing 的時間（因為 Waiting 包含在 Processing 時間內了）

# 当内存超过1024M时自动重启。 如果工程中有比较棘手的内存泄露问题，这个算是一个折中方案。
pm2 start app.js --max_memory_restart 1024M 

