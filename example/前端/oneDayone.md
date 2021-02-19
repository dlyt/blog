### Object.defineProperty

```js
const person = { name: 'yd' }
Object.defineProperty(person, 'age', { value: 21 })
person.age = 18
console.log(person)
console.log(Object.keys(person))
```

`Object.defineProperty` 方法添加的属性默认是不可枚举，默认不可改变，默认不能删除，不能重新定义。

```js
var obj = {}
obj.name = 'tn'

// 相当于
Object.defineProperty(obj, 'name', {
	value: 'tn',
	writable: true, // 是否可以改变，false 只读
	configurable: true, // 是否可以删除，是否可以修改
	enumerable: true, // 是否可以枚举
})
```

```js
Object.defineProperty(obj, 'name', { value: 1 })

// 相当于
Object.defineProperty(obj, 'name', {
	value: 1,
	writable: false,
	configurable: false,
	enumerable: false,
})
```

### 引入模块是只读的，不能修改。并且 import 命令具有提升效果

```js
//counter.js
let counter = 10
const add = () => {
	console.log(counter)
}
export { counter, add }

//index.js
add()
import { counter, add } from './counter'
counter += 1
console.log(counter)
```

import 命令输入的变量都是只读的

import 命令具有提升效果

import 是静态执行，所以不能使用表达式和变量

import 语句是 Singleton 模式
