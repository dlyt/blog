```js
//适配
var $that = $(window), base_data;
var winW = $that.width();
var winH = $that.height();
$that.on("resize", function () {
    $("html").css("fontSize", $that.width() / 6.4);
    // 获取屏幕尺寸宽高
    if (winH / winW <= 1.6 && winH / winW > 1) {
        $("html").css("fontSize", (winH / 1206) * 100 + "px");
    }
}).resize();
```

https://bigqianduan.top/libs/cjm.html

### 什么是渐进式框架
### z-index失效的几种情况
失效的情况:

1、父标签 position属性为relative；

2、问题标签无position属性（不包括static）；

3、问题标签含有浮动(float)属性。

4、问题标签的祖先标签的z-index值比较小



解决方法:

第一种:  position:relative改为position:absolute；

第二种:浮动元素添加position属性（如relative，absolute等）；

第三种:去除浮动。

第四种:提高父标签的z-index值

### JavaScript 如何工作：对引擎、运行时、调用堆栈的概述


### 闭包
函数作为参数被传递
函数作为返回值被返回

自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方；

变量会常驻内存，得不到释放
### call 和 apply 的区别
fn.call(this, p1, p2, p3)
fn.apply(this, arguments)