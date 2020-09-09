https://juejin.im/post/6869908820353810445
### 对MVVM模型的理解
Model（模型）、View（视图）和 ViewModel（视图模型）
View 是用户在屏幕上看到的结构、布局、和外观，也称UI。
ViewModel 是一个绑定器，能和 View 层和 Model 层进行通信。
Model 是数据和逻辑

View 不能和 Model 直接通信，它们只能通过 ViewModel 通信。Model 和 ViewModel 之间的交互是双向的，ViewModel 通过双向数据绑定把 View 层和 Model 层连接起来，因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

### Vue 生命周期
beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroy

### Vue组件渲染和更新过程
1. 模板编译，parse 解析模板生成抽象语法数；generate 将 AST 转成 render 函数，render 函数用于构建 Vnode;
2. 构建 Vnode ，使用 createElement 构建 Vnode。
3. Vnode 转真
Render Function => vdom 渲染 dom 结构 => touch Data (getter, setter) => collect as Dependency => Wathcher
=> 组件更新 修改data 触发 setter => notify Watcher => re-render 重新渲染

### Vue 3 升级内容
全部用 ts 重写
性能提升，代码量减少

### Vue 响应式
监听data变化的核心API: Object.defineProperty；
```js
const data = {};
const name = 'xiaowu';
Object.defineProperty(data, 'name', {
    get: function () {
        console.log('get');
        return name;
    },
    set: function (newVal) {
        console.log('set');
        name = newVal;
    }
});

console.log(data.name); // get xiaowu
data.name = 'lisi'; // set 
```
循环监听每个属性
for (let key in target) {
    defineReactive(target, key, target[key])
}

如何监听数组
```js
// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向 oldArrayProperty, 再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(name => {
    arrProto[name] = function () {
        update()
        oldArrayProperty[methodName].call(this, ...arguments)
    }
})

if (Array.isArray(target)) {
    target.__proto__ = arrProto
}
```

如何深度监听
```js
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }
}
```
设置新值时也要监听 observer

object.defineProperty 缺点
深度监听，需要递归到底，一次性计算量大
无法监听新增属性/删除属性（需要 Vue.set，Vue.delete 来解决）
无法原生监听数组，需要特殊处理

### Proxy 基本使用
```js
const proxyData = new Proxy(data, {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver)
        return result
    },
    set(target, key, val,receiver) {
        const result = Reflect.get(target, key, val, receiver)
        return result
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key, receiver)
        return result
    }
})
```
