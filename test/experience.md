# 利用事件队列解决雪崩问题
```js
    return new Promise(function(resolve, reject) {
        var key = dxlMcrypto.md5(JSON.stringify(opt));
        var useData = function (err, res, data) {
            if (err) {
                reject(new Error(err.message + ' host:' + host + ' params:' + JSON.stringify(opt.body)));
            } else if (res.statusCode === 200 || res.statusCode === 304) {
                resolve(data);
            } else {
                reject(new Error(host + ' not found or other error' + ' params :' + JSON.stringify(opt.body)));
            }
        };
        var callback = function (err, res, data) {
            guarder.emitter.emit(key, err, res, data);
            guarder.fetchedKeys[key] = null;
            useData(err, res, data);
        };
        if (!guarder.fetchedKeys[key]) {
            guarder.fetchedKeys[key] = true;
            request(opt, callback);
        } else {
            guarder.emitter.once(key, function(err, response, data) {
                useData(err, response, data);
            });
        }
        request(opt, callback);
    });
```
；
## 桥接模式
桥接模式应该是“把抽象概念和具体实现分离开来，让这两部分可以完全独立地变化”。
## 组合模式
组合模式有两个优点：
你可以像对待单个独立的对象一样对待这些对象的集合。在组合模式中，函数的执行会被分派到各个子对象去执行。这对一个大的集合非常有用（这里可能有些似是而非，因为你并不知道多大的集合才算大，所以也就无从知晓会遭受多大的性能影响）。
组合模式把对象组织成一棵树的结构，并且，因为每一个组合对象都包含一个获取其子对象（children）的方法，所以你可以隐藏具体的实现，并且随便你怎么组织这些子对象。
## 外观模式

## 适配器模式

## 装饰者模式

## 工厂模式
简单说：假如我们想在网页面里插入一些元素，而这些元素类型不固定，可能是图片、链接、文本，根据工厂模式的定义，在工厂模式下，工厂函数只需接受我们要创建的元素的类型，其他的工厂函数帮我们处理。
简单工厂
```js
var CarFactory = {
    // 用只一个方法就能制造一辆可任意组合功能的汽车
    makeCar: function (features) {
        var car = new Car();

        // 如果指定了功能就把功能加到car上
        if (features && features.length) {
            var i = 0,
                l = features.length;

            // 遍历所有的功能并添加到car上
            for (; i < l; i++) {
                var feature = features[i];

                switch(feature) {
                    case 'powerwindows':
                        car = new PowerWindowsDecorator(car);
                        break;
                    case 'powerlocks':
                        car = new PowerLocksDecorator(car);
                        break;
                    case 'ac':
                        car = new ACDecorator(car);
                        break;
                }
            }
        }

        return car;
    }
}

// 调用工厂方法，传一个字符串列表进去 
// 这些字符串标识了你想让这辆车拥有的功能
var myCar = CarFactory.makeCar(['powerwindows', 'ac']);

// 如果你只想一辆普通的老款车，那就什么参数都不用传
var myCar = CarFactory.makeCar();
```
```js
// Joe店
var shop = new JoeCarShop();
var car = shop.sellCar("sedan", ["powerlocks"]);

// Zim店怎么办，同样
shop = new ZimCarShop();
car = shop.sellCar("sedan", ["powerlocks"]);

// 不同的店决定我会拿到不同品牌的车
// 就算我们给它相同的参数
```
## 观察者模式
观察者模式包含两种角色：
    观察者（订阅者）
    被观察者（发布者）
核心思想：观察者只要订阅了被观察者的事件，那么当被观察者的状态改变时，被观察者会主动去通知观察者，而无需关心观察者得到事件后要去做什么，实际程序中可能是执行订阅者的回调函数。
## 终结者模式
中介者模式包含两种角色：
    中介者（事件发布者）
    通信者
简单说：就像一辆汽车的行驶系统，观察者模式中，你需要知道车内坐了几个人（维护观察者列表），当汽车发生到站、停车、开车...这些事件（被订阅者事件）时，你需要给这个列表中订阅对应事件的的每个人进行通知；
在中介者模式中，你只需要在车内发出广播（到站啦、停车啦、上车啦...请文明乘车尊老爱幼啦...），而不用关心谁在车上，谁要上车谁要下车，他们自己根据广播做自己要做的事，哪怕他不听广播，听了也不做自己要做的事都无所谓。