### 计算机基础
计算机使用 8 位(bit)二进制表示一个字节(Byte)，计算机内存最小寻址单位就是 1 字节。
在javascript中，\u 加 4个16进制字符表示一个字符的编码（每个字节 8 位二进制对应2位十六进制，2^8 = 256 = 16^2），不足4位16进制的，高位用0补足，比如 \u55B5 表示汉字 "喵",字母 "a" 的 ASCII 码是10进制 97，表示成 16 进制 unicode 编码格式就是 \u0061
### Buffer是什么
Buffer是一个类数组对象，里面存储的是字节，有点类似于字节数组，主要用于操作字节的。