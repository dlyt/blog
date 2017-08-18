### 为什么选择 Token， 与 Seesion 区别?
#### Seesion
- 需要通过 cookie 中保存 seesionID， 容易产生 CSRF（跨站请求伪造） 漏洞。
- Cookie 是不允许跨域访问的，这一点对 Token 机制是不存在的。
##### CSRF可以做什么？
你这可以这么理解CSRF攻击：攻击者盗用了你的身份，以你的名义发送恶意请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。
#### Token
不通过 cookie 保存。
 
对于刷新 token，可以主动发起 refresh 请求，在认证失败的时候再进行一次刷新操作，如果刷新成功就在 Response 的 header 中附加 refresh_token ，客户端对 header 进行检测，如果存在 refresh_token 就更新本地 token。