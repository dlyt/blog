### 定义
函数式编程：以函数作为主要载体的编程方式，用函数去拆解，抽象一般的表达式。
### 好处
- 语义更加清晰
- 可复用性更高
- 可维护性更好
- 作用域局限，副作用少
### 链式优化
```js
// 一般写法
console.log(1 + 2 + 3 - 4)


// 函数式写法
function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

console.log(sub(sum(sum(1, 2), 3), 4);
```

```js
// 优化写法 (嗯，你没看错，这就是 lodash 的链式写法)
const utils = {
  chain(a) {
    this._temp = a;
    return this;
  },
  sum(b) {
    this._temp += b;
    return this;
  },
  sub(b) {
    this._temp -= b;
    return this;
  },
  value() {
    const _temp = this._temp;
    this._temp = undefined;
    return _temp;
  }
};

console.log(utils.chain(1).sum(2).sum(3).sub(4).value());
```
### 高阶函数
定义：将一个或多个函数作为参数或者返回新函数的函数