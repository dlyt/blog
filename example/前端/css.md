### css选择器有哪些，选择器的权重的优先级
选择器类型：
1、ID　　#id
2、class　　.class
3、标签　　p
4、通用　　*
5、属性　　[type="text"]
6、伪类　　：hover
7、伪元素　　::first-line
8、子选择器、相邻选择器
 
权重计算规则：
1、第一等：代表内联样式，如: style=””，权值为1000。
2、第二等：代表ID选择器，如：#content，权值为0100。
3、第三等：代表类，伪类和属性选择器，如.content，权值为0010。
4、第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。
5、通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。
6、继承的样式没有权值。

### 浏览器兼容性差异
1. 标签默认的 margin 和 padding 不同
解决方案：{ margin: 0; padding: 0; }
2. 图片默认有间距
解决方案：使用 float 属性为 img 布局

### 块状元素和内联元素
块状元素：display：block/table；独占一行；div，h1，table，ul，p 等；
内联元素：display：inline/inline-block；span，img，input，button 等；

### 盒模型宽度计算
offsetWidth = （内容宽度 + 内边距 + 边框），无外边距（margin）；
box-sizing: border-box; 会使 offsetWidth = width；实际的 width 会缩小；

### margin 纵向重叠问题
相邻元素的 margin-top 和 margin-bottom 会发生重叠；取最大值；
空白内容的 `<p> </p>` 也会重叠；

### margin 负值问题
margin-top 和 margion-left 负值，元素向上、向左移动；
margin-right 负值，右侧元素左移，自身不受影响；
margin-bottom 负值，下方元素上移，自身不受影响；

### BFC 理解与应用
Block format context，块级格式化上下文；
一块独立渲染区域，内部元素渲染不会影响边界以外的元素；
形成 BFC 的条件：
    float 不是 none；position 是 absolute 或者 fixed；overflow 不是 visible；display 是 flex inline-block等；
BFC 的常见应用，清除浮动；

### float 布局
圣杯布局和双飞翼布局的技术总结：
    使用 float 布局；
    两侧使用 margin 负值，以便和中间内容横向重叠；
    防止中间内容被两侧覆盖，一个用 padding 一个用 margin;
### flex 布局
flex-direction 主轴的方向（横向或者纵向）；
justify-content 主轴的对齐方式（开始，结束，居中，两边）；
align-items 交叉轴对齐方式（和主轴垂直的那个轴）；
flex-wrap 是否换行；
align-self 子元素在交叉轴的对齐方式；

display: flex;
justify-content: space-between;

align-self: center;

align-self: flex-end;

### absolute 和 relative 定位
relative 依据自身定位；
absolute 依据最近一层的定位元素定位；向上找 absolute，relative，fixed，body 定位；

### 居中对齐的几种方式
水平居中：
    inline 元素：text-align: center;
    block 元素：margin: auto;
    absolute 元素：left: 50% + margin-left 负值；
垂直居中：
    inline 元素：line-height 的值等于 height 值；
    absolute 元素：top: 50% + margin-top 负值；
    absolute 元素：transform(-50%, -50%)；
    absolute 元素：top，left，bottom，right = 0 + margin: auto；

### line-height 如何继承
具体数值如 30px 或者比例 3 / 1.5 则正常继承该数值；
百分比如 200%，则继承计算出来的值；

### rem
相对长度单位，相对于根元素，常用于响应式布局；

### 响应式布局的常用方案
media-query，根据不同的屏幕宽度设置根元素 font-size；
rem，基于根元素的相对单位；
    

