# 惰性单例模式
在合适的时候才创建对象，并且只创建唯一的一个。
实例：登录框
```js
var getSingle = function( fn ){
 var result;
 return function(){
 return result || ( result = fn .apply(this, arguments ) );
 }
}; 
```
# 策略模式
策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
优点
1. 避免多重选择语句
2. 完美支持开发-封闭原则，易于扩展
```js
var calculateBonus = function( performanceLevel, salary ){
 if ( performanceLevel === 'S' ){
    return salary * 4;
 }
 if ( performanceLevel === 'A' ){
    return salary * 3;
 }
 if ( performanceLevel === 'B' ){
    return salary * 2;
 }
};
calculateBonus( 'B', 20000 ); // 输出：40000
calculateBonus( 'S', 6000 ); // 输出：24000 
```
```js
var strategies = {
 "S": function( salary ){
        return salary * 4;
    },
 "A": function( salary ){
        return salary * 3;
    },
 "B": function( salary ){
    return salary * 2;
 }
};
var calculateBonus = function( level, salary ){
 return strategies[ level ]( salary );
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000 
```
# 代理模式
图片预加载
# 迭代器模式
forEach 循环
# 观察者模式
它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
真实例子
网站登录，订阅登录事件，登录成功后处理其他工作。
先发布后订阅
事件发布的时候如果没有订阅者先放入堆栈中去，当有对象订阅此事件的时候，遍历堆栈依次执行。
优点：
时间上解耦
对象之间解耦
缺点：
销毁时间和内存
如果订阅了一个消息，最后都没有发生，订阅者会一直存在内存中