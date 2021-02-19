### css 选择器有哪些，选择器的权重的优先级

选择器类型：
id 选择器(#myid)
类选择器(.myclassName)
标签选择器(div,h1,p)
子代选择器(ul>li)
后代选择器(li a)
通配符选择器(\*)
属性选择器(a[rel="external"])
伪类选择器(a:hover,li:nth-child)

权重计算规则：
1、第一等：代表内联样式，如: style=””，权值为 1000。
2、第二等：代表 ID 选择器，如：#content，权值为 0100。
3、第三等：代表类，伪类和属性选择器，如.content，权值为 0010。
4、第四等：代表类型选择器和伪元素选择器，如 div p，权值为 0001。
5、通配符、子选择器、相邻选择器等的。如\*、>、+,权值为 0000。
6、继承的样式没有权值。

可继承的样式： font-size font-family color
不可继承的样式： border padding margin height width

优先级就近原则，同权重样式定义最近
载入样式以最后载入的定位为准

优先级：
important > 内嵌 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 继承 > 通配符

### display 有哪些值 作用

block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示；
none 元素不显示
inline 行内元素 默认宽度为内容宽度 不可设置宽高 同行显示
inline-block 默认宽度为内容宽度 可以设置宽高 同行显示
list-item 像块类型元素一样 可以设置宽高 同行显示
table 表格显示
inherit 从父元素继承 display 属性的值

### 请解释一下 css3 的 flex(弹性盒布局模型)以及使用场景

一个用于页面布局的全新 css3 功能，flexbox 可以把列表放在同一个方向(从上到下排列，从左到右)，并且列表能延伸到占用可用的空间，较为复杂的布局还可以嵌套一个伸缩容器(flex container)来实现。采用 flex 布局的元素，成为 flex 容器。常规布局是基于块和内联流方向，而 flex 布局是基于 flex 布局 flex-flow 流可以很方便的用来做居中，能对不同屏幕大小自适应，在布局上有了比以前更加灵活的空间

### 浏览器兼容性差异

1. 标签默认的 margin 和 padding 不同
   解决方案：{ margin: 0; padding: 0; }
2. 图片默认有间距
   解决方案：使用 float 属性为 img 布局

### 块状元素和内联元素

块状元素：display：block/table；独占一行；div，h1，table，ul，p 等；
内联元素：display：inline/inline-block；span，img，input，button 等；

### 盒模型宽度计算

盒模型的组成：
元素的内容（content），元素的内边距（padding），内容与边框之间的距离，元素的边框（border），元素的外边距（margin）；

offsetWidth = （内容宽度 + 内边距 + 边框），无外边距（margin）；

怪异盒模型：
box-sizing: border-box; 会使 offsetWidth = width；实际的 width 会缩小；

CSS 盒模型和 IE 盒模型的区别：

在 标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

IE 盒子模型中，width 和 height 指的是内容区域+border+padding 的宽度和高度。
box-sizing: border-box; content = width - border - padding; box-sizing 默认值 content-box;

JS 如何设置获取盒子模型对应的宽和高: dom.currentStyle.width/height

加上 overflow: hidden; 实际就是创建一个 BFC (块级格式化上下文)

## BFC

概念：具有 BFC 特性的元素可以看做是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素。

如何创建 BFC ?
float 不为 none 的时候；
position 不为 static 或者 relative；
display 与 table 相关、inline-block、table-cells、flex；
overflow 为 auto，hidden、scroll；

同一个 BFC 下外边距会发生折叠，如果想避免外边距的的重叠，可以将其放在不同的容器中；
BFC 可以包含浮动的元素（清除浮动）
BFC 可以阻止元素被浮动元素覆盖

<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>

## 常见的定位方式

普通流：行内水平，块级换行；
浮动：向左，向右；
绝对定位（absolute positioning）：元素整体脱离普通流，具体位置由绝对定位的坐标决定；

### margin 纵向重叠（塌陷）问题

相邻元素的 margin-top 和 margin-bottom 会发生重叠；取最大值；
空白内容的 `<p> </p>` 也会重叠；

### rem

布局的本质是等比缩放；

px 绝对长度单位；em 相对长度单位，相对于父元素；rem 相对长度单位，相对于根元素；

### 页面视图尺寸

window.screen.height // 屏幕高度 667

window.innerHeight // 视图高度 553

### vw/vh

vh 网页视图高度的 1/100

vw 网页视图宽度的 1/100

vmin vw 和 vh 中的较小值；

vmax vw 和 vh 中的较大值；

### margin 负值问题

margin-top 和 margion-left 负值，元素向上、向左移动；
margin-right 负值，右侧元素左移，自身不受影响；
margin-bottom 负值，下方元素上移，自身不受影响；

### BFC 理解与应用

Block format context，块级格式化上下文；
一块独立渲染区域，内部元素渲染不会影响边界以外的元素；
形成 BFC 的条件：
float 不是 none；position 是 absolute 或者 fixed；overflow 不是 visible；display 是 flex inline-block 等；
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

### HTML 中的三种布局方式

标准流、浮动、定位；

块级元素：div H table ul li p；独占一行

内联元素：a input span img；同一行

position 定位属性：
static 默认值 标准流的方式；
relative 相对定位 相对于其他正常位置进行定位 可通过 left 改变位置；
absolute 绝对定位 相对于 static 脱离文档流；
fixed 绝对定位 相对于窗口进行定位；
inherit 从父元素继承 position 属性的值；

https://www.cnblogs.com/lrgupup/p/11445957.html

### 如何解决 1px 问题

### 浏览器兼容问题

|| ie 不兼容

## 不同浏览器的标签默认的外补丁和内补丁不同

问题症状：随便写几个标签，不加样式控制的情况下，各自的 margin 和 padding 差异较大。
碰到频率:100%
解决方案：CSS 里 \*{margin:0;padding:0;}

## 块属性标签 float 后，又有横行的 margin 情况下，在 IE6 显示 margin 比设置的大

问题症状:常见症状是 IE6 中后面的一块被顶到下一行
碰到频率：90%（稍微复杂点的页面都会碰到，float 布局最常见的浏览器兼容问题）
解决方案：在 float 的标签样式控制中加入 display:inline;将其转化为行内属性
备注：我们最常用的就是 div+CSS 布局了，而 div 就是一个典型的块属性标签，横向布局的时候我们通常都是用 div float 实现的，横向的间距设置如果用 margin 实现，这就是一个必然会碰到的兼容性问题。

## 设置较小高度标签（一般小于 10px），在 IE6，IE7，遨游中高度超出自己设置高度

问题症状：IE6、7 和遨游里这个标签的高度不受控制，超出自己设置的高度
碰到频率：60%
解决方案：给超出高度的标签设置 overflow:hidden;或者设置行高 line-height 小于你设置的高度。
备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是 IE8 之前的浏览器都会给标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。

## 行内属性标签，设置 display:block 后采用 float 布局，又有横行的 margin 的情况，IE6 间距 bug

问题症状：IE6 里的间距比超过设置的间距
碰到几率：20%
解决方案 ： 在 display:block;后面加入 display:inline;display:table;
备注：行内属性标签，为了设置宽高，我们需要设置 display:block;(除了 input 标签比较特殊)。在用 float 布局并有横向的 margin 后，在 IE6 下，他就具有了块属性 float 后的横向 margin 的 bug。不过因为它本身就是行内属性标签，所以我们再加上 display:inline 的话，它的高宽就不可设了。这时候我们还需要在 display:inline 后面加入 display:talbe。

## 图片默认有间距

问题症状：几个 img 标签放在一起的时候，有些浏览器会有默认的间距，加了问题一中提到的通配符也不起作用。
碰到几率：20%
解决方案：使用 float 属性为 img 布局
备注 ： 因为 img 标签是行内属性标签，所以只要不超出容器宽度，img 标签都会排在一行里，但是部分浏览器的 img 标签之间会有个间距。去掉这个间距使用 float 是正道。（我的一个学生使用负 margin，虽然能解决，但负 margin 本身就是容易引起浏览器兼容问题的用法，所以我禁止他们使用）

## 标签最低高度设置 min-height 不兼容

问题症状：因为 min-height 本身就是一个不兼容的 CSS 属性，所以设置 min-height 时不能很好的被各个浏览器兼容
碰到几率：5%
解决方案：如果我们要设置一个标签的最小高度 200px，需要进行的设置为：{min-height:200px; height:auto !important; height:200px; overflow:visible;}
备注：在 B/S 系统前端开时，有很多情况下我们又这种需求。当内容小于一个值（如 300px）时。容器的高度为 300px；当内容高度大于这个值时，容器高度被撑高，而不是出现滚动条。这时候我们就会面临这个兼容性问题。

## 透明度的兼容 CSS 设置

一般在 ie 中用的是 filter:alpha(opacity=0);这个属性来设置 div 或者是块级元素的透明度，而在 firefox 中，一般就是直接使用 opacity:0,对于兼容的，一般的做法就是在书写 css 样式的将 2 个都写上就行，就能实现兼容

### link 和 @import 的区别？

link 属于 HTML 标签，而 @import 是 CSS 提供的；
页面被加载时，link 会同时被加载，而 @import 引用的 CSS 会等到页面被加载完再加载；
@import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题；
link 方式的样式的权重高于 @import 的权重；

###  列举几种清除浮动的方法？

父级 div 定义 height，不推荐使用；父级 div 定义伪类 :after 和 zoom，zoom 解决 ie6，ie7 浮动问题；
父级定义 overflow：hidden/auto；必须定义 width 或 zoom: 1。同时不能定义 height；

### block，inline 和 inlinke-block 细节对比？

• display:block
a、block 元素会独占一行，多个 block 元素会各自新起一行。默认情况下，block 元素宽度自动填满其父元素宽度。
b、block 元素可以设置 width,height 属性。块级元素即使设置了宽度,仍然是独占一行。
c、block 元素可以设置 margin 和 padding 属性。
• display:inline
a、inline 元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
b、inline 元素设置 width,height 属性无效。
c、inline 元素的 margin 和 padding 属性，水平方向的 padding-left, padding-right, margin-left, margin-right 都产生边距效果；但竖直方向的 padding-top, padding-bottom, margin-top, margin-bottom 不会产生边距效果。
• display:inline-block
a、简单来说就是将对象呈现为 inline 对象，但是对象的内容作为 block 对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个 link（a 元素）inline-block 属性值，使其既具有 block 的宽度高度特性又具有 inline 的同行特性。
补充说明
a、一般我们会用 display:block，display:inline 或者 display:inline-block 来调整元素的布局级别，其实 display 的参数远远不止这三种，仅仅是比较常用而已。
b、IE（低版本 IE）本来是不支持 inline-block 的，所以在 IE 中对内联元素使用 display:inline-block，理论上 IE 是不识别的，但使用 display:inline-block 在 IE 下会触发 layout，从而使内联元素拥有了 display:inline-block 属性的表象。

### flex: 0 1 auto 表示什么意思

```css
.item-1 {
	width: 140px;
	flex: 2 1 0%;
	background: blue;
}
.item-2 {
	width: 100px;
	flex: 2 1 auto;
	background: darkblue;
}
.item-3 {
	flex: 1 1 200px;
	background: lightblue;
}
```

先确定看 flex-grow 还是 flex-shrink
item1 flex-grow 300 2/5 flex-shrink flex-basis 0% 0px
item2 flex-basis auto 100px flex-grow 300 2/5
item1 flex-basis 200px 200px flex-grow 300 1/5

`flex: 1 2 500px; flex: 2 1 400px;`

1. 总权重 500 _ 2 + 400 _ 1 = 1400 <br />
2. 需要缩小的宽度 <br />
   left (500 _ 2 / 1400) _ 300 = 214.285714286<br />
   right (400 _ 1 / 1400) _ 300 = 85.714285714<br />
3. 最后的宽度<br />
   left 500 - 214.285714286 = 285.714285714<br />
   right 400 - 85.714285714 = 314.285714286 <br />
