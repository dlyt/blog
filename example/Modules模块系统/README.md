# 1.模块加载
exports 是对 module.exports 的一个简单引用。如果你需要将模块导出为一个函数（如：构造函数），或者想导出一个完整的出口对象而不是作为属性导出，这是应该使用 module.exports。

# 7.循环依赖
当 require() 存在循环调用时，模块在返回时可能并不会被执行。

# 9.文件夹作为模块
文件夹作为 require() 的参数来加载。
- 通过 package.json 文件加载
- 通过 index.js 文件加载
- 通过 index.json 文件加载 