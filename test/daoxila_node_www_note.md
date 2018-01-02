# 婚宴
主表 数据库 dxl_feast 中的 hote_base 
id                       id                     
name                     名称                 name
region                   区域                 region
address                  地址                 address
url                      酒店url              url
priceMin                 最低消费             pay_min_num
priceMax                 最高消费             pay_max_num
deskMax                  最大桌数             desk_max_num
couponFlag               优惠标志             coupon_flag
giftFlag                 礼物标志             gift_flag

couponIcon               优惠图标             gift_flag、coupon_flag、pay_config(支付 dxl_pay)
cover                    封面图               hotel_image
class                    酒店类型             hotel_type
layer                    酒店层级             ontop_biz(主库)  layer
isvr                     是否有VR             hotel_hall   hall_vr
hasVideo                 是否有视频           hotel_desc   video_url
videoUrl                 视频url地址          hotel_desc   video_url

# substr(-1)
取最后一个字符串。
# slice(0, -1)
取除了最后一个字符串之外的所有字符串。
# apply()
定义：指定this值和参数的情况下调用某个函数。
与call()的唯一区别是call方法接受的是一个参数列表，而apply()接受的是一个包含多个参数的数组。
如果这个函数处于非严格模式下，则指定为null或undefined时会自动指向全局对象，同时值为原始值的this会指向该原始值的自动包装对象。
# split()
实例：
```js
var str = 'www.denpe.com';
var res = str.split(',')     // ["www", "denpe", "com"]
```
# join()
实例：
```js
var a = ['Wind', 'Rain', 'Fire'];
a.join(' + '); // 'Wind + Rain + Fire'
```
# JSON.parse(test)
参数说明：
test：必需，一个有效的JOSN字符串。（如果不是有效字符串会抛出异常）
      不允许以逗号结尾。
返回值：Object对应给定的JSON文本。
# JSON.stringify()
JaveScript转换成json。
# parseInt()
解析一个字符串，并返回一个指定基数的整数。
# match()
定义：当一个字符串与一个正则表达式匹配时，match()方法检索匹配项。
# toLowerCase()
转换成小写
# substring()
截取字符串
# filter(fun)
返回经过fun过滤的数组

# lodash
## pick()
创建一个从 object 中选中的属性的对象。
## cloneDeep()
_.cloneDeep(obj) 等价于 _.clone(obj, true)。
在JavaScript中，对于Object和Array这类引用类型值，当从一个变量向另一个变量复制引用类型值时，这个值的副本其实是一个指针，两个变量指向同一个堆对象，改变其中一个变量，另一个也会受到影响。
如果想不受影响就需要使用深拷贝。
## uniqBy()
返回不重复的数组
## concat()
连接数组

# Events
解决多状态异步操作的响应问题
利用事件队列解决雪崩问题，所谓雪崩问题，是在缓存失效的情景下，大量并发的npm config get prefix访问同时涌入数据库中查询，数据库无法同时承受如此大的查询请求，进而影响网站整体响应缓慢。
## emitter.once(eventName, listener)
eventName <String> | <Symbol> 事件名
listener <Function> 回调函数
添加一个单次 listener 函数到名为 eventName 的事件。下次触发 eventName 事件时，监听器会被移除，然后调用。
返回一个 EventEmitter 引用，可以链式调用。
## emitter.emit(eventName[, ...args])
按监听器的注册顺序，同步地调用每个注册到名为 eventName 事件的监听器，并传入提供的参数。
如果事件有监听器，则返回 true，否则返回 false。

# Promise

# async函数
定义：Generator 函数的语法糖
async 函数对 Generator 函数的改进，体现在以下四点。
1.内置执行器
不需要调用 next 方法，或者用co模块。
2.更好的语意
3.更广的适用性
4.返回值是 Promise

# for...in
缺陷：
在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。举个例子，如果你的数组中有一个可枚举属性myArray.name，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。
最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。
# for...of
这是最简洁、最直接的遍历数组元素的语法
这个方法避开了for-in循环的所有缺陷
与forEach()不同的是，它可以正确响应break、continue和return语句
# redis
五种数据类型及其使用场景：http://www.cleey.com/blog/single/id/808.html
# memcached
如果要说内存使用效率，使用简单的key-value存储的话，Memcached的内存利用率更高。
### 数组去重
```js
let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
console.log(array);
// => [1, 2, 3, 4]
```
附：ES5实现数组去重
```js
var array = [1, '1', 1, 2, 3, 2, 4];
var tmpObj = {};
var result = [];
array.forEach(function(a) {
  var key = (typeof a) + a;
  if (!tmpObj[key]) {
    tmpObj[key] = true;
    result.push(a);
  }
});
console.log(result);
// => [1, "1", 2, 3, 4]
```

