### 单例模式
在Node.js中创建单例模式非常的简单，只需要用 require 即可。
#### 惰性单例模式
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
### 策略模式
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
### 外观模式
外观模式只暴露一个很简单的方法，然后该方法在内部执行，调用内部的其他方法。
```js
class Facade {
    _get() {
        console.log("current value:" + this.i);
    }
    _set(val) {
        this.i = val;
    }
    _run() {
        console.log("running");
    }
    facade(args) {
        this._set(args.val);
        this._get();
        if (args._run) {
            this._run();
        }
    }
}
let fa = new Facade();
fa.facade({ run: true, val: 10 });
```
### 工厂模式
工厂模式使我们不需要使用构造器，而是提供一个泛型接口来创建对象。这种模式在创建过程变得复杂时会非常有用。
```js
class VehicleFactory {
    constructor() {
        this.vehicleClass = Car;
    }
    createVehicle(options) {
        if (options.vehicleType === "car") {
            this.vehicleClass = Car;
        } else {
            this.vehicleClass = Truck;
        }
        return new this.vehicleClass(options);
    }
}

class Car {
    constructor(options) {
        // some defaults
        options = options || "";
        this.doors = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "silver";
    }
}
class Truck {
    constructor(options) {
        this.state = options.state || "used";
        this.wheelSize = options.wheelSize || "large";
        this.color = options.color || "blue";
    }
}
//usage 
let carFactory = new VehicleFactory();
let car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});
```
### 观察者模式
雪崩事件是观察者模式的实例么？
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
### 命令模式
应用场景：
有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
只使用一个方法，第一个参数是我们实际调用的方法，后面的参数是作为该调用方法的参数
```js
class CarManager {
    requestInfo(model, id) {
        return `The information for ${model} with ID ${id} is foobar` 
    }
    execute(name) {
        const carManager = new CarManager();
        return carManager[name] && carManager[name].apply(carManager, [].slice.call(arg, 1));
    }
}
const carManager = new CarManager();
console.log(carManager.execute('requestInfo', 'Ford', 110))
```
### 组合模式
当按下遥控器的按钮时，所有命令都将被依次执行。
扫描文件夹
### 装饰者模式
装饰模式经典的应用是AOP编程，比如“日志系统”。
- 是继承关系的一个替代方案
- 动态地给对象添加额外的职责
- 在不改变接口的前提下，增强类的性能
装饰模式是只针对一个基本的对象，添加一些修饰。如下面的是对MacBook，加内存（Memory函数装饰）增加75美元，雕刻（Engraving函数装饰）增加200美元，买保险（Insurance函数装饰）增加250美元。
```js
class MacBook {
    cost() {
        return 997;
    }
    screenSize() {
        return 11.6;
    }
}

function Memory(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };
}
// Decorator 2
function Engraving(macbook) {

    let v = macbook.cost();
    macbook.cost = function() {
        return v + 200;
    };
}
// Decorator 3
function Insurance(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 250;
    };
}
let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
console.log(mb.cost());// Outputs: 1522
console.log(mb.screenSize());// Outputs: 11.6
```
### 代理模式
图片预加载
### 迭代器模式
forEach 循环
