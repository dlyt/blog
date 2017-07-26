### 概述
Node应用有模块组成，采用CommonJS模块规范。

根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类、都是私有的，对其他文件不可见。

CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`)是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

CommonJS模块的特点如下。
 - 所有代码都运行在模块作用域，不会污染全局作用域。
 - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，就必须清楚缓存。
 - 模块加载的顺序，按照其在代码中的出现的顺序。

### module对象
Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。

每个模块内部，都有一个`module`对象，代表当前模块。它有以下属性。
 - module.id 模块的识别符，通常是带有绝对路径的模块文件名。
 - module.filename 模块的文件名，带有绝对路径。
 - module.loaded 返回一个布尔值，表示模块是否已经完成加载。
 - module.parent 返回一个对象，表示调用该模块的模块。
 - module.children 返回一个数组，表示该模块要用到的其他模块。
 - module.exports 表示模块对外输出的值。
#### module.exports属性
`module.exports`属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量。
#### exports变量
为了方便，Node为每个模块提供一个exports变量，指向module.exports。

### require命令
#### 基本用法
Node使用CommonJS模块规范，内置的`require`命令用于加载模块文件。

`require`命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。
### 模块的加载机制
#### require的内部处理流程
`require`命令是CommonJS规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的`module.require`命令，而后者又调用Node的内部命令`Module._load`
```js
Module._load = function(request, parent, isMain) {
    // 1. 检查 Module._cache, 是否缓存之中有指定模块
    // 2. 如果缓存之中没有，就创建一个新的Module实例
    // 3. 将它保存到缓存
    // 4. 使用 module.load() 加载指定的模块文件
    //    读取文件内容之后，使用 module.compile() 执行文件代码
    // 5. 如果加载/解析过程报错，就从缓存删除该模块
    // 6. 返回该模块的 module.exports
}

Module.prototype._compile = function(content, filename) {
    // 1. 生成一个require函数，指向module.require
    // 2. 加载其他辅助方法到require
    // 3. 将文件内容放到一个函数之中，该函数可调用 require
    // 4. 执行该函数
}
```
`require`函数及其辅助方法主要如下。
 - require()：加载外部模块
 - require.resolve()：将模块名解析到一个绝对路径
 - require.main：指向所有缓存的模块
 - require.extensions：根据文件的后缀名，调用不同的执行函数