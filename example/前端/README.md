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
### JavaScript 如何工作：对引擎、运行时、调用堆栈的概述