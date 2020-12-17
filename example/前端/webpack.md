### 前端为何要进行打包和构建
体积更小（Tree-ShaKing、压缩、合并），加载更快
编译高级语言或语法（TS、ES6+、模块化、scss）
兼容性和错误检查（Polyfill、postcss、eslint）

统一、高效的开发环境
统一的构建流程和产出标准
集成公司构建规范（提测、上线等）

### Tree-shaking 的实现原理
利用ES6模块特性：
  只能作为模块顶层的语句出现
  import的模块名只能是字符串常量
  import bingding 是 immutable 的，引入的模块不能再进行修改
代码删除：
  uglify：判断程序流，判断变量是否被使用和引用，进而删除代码
实现原理概述：
  ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了哪些模块
  静态分析程序流，判断哪些模块和变量未被使用或者引用，进而删除对应代码
备注：
  Tree-shaking 不支持 CommonJs，所以需要配置不转义`options: { presets: [ [ 'es2015', { modules: false } ] ] }`
  如果所有代码都不包含副作用，我们就可以简单地将该属性标记为false，来告知 webpack，它可以安全地删除未用到的export导出。`{"name": "tree-shaking","sideEffects": false}`

### CommonJS 和 ES6 Module 的区别
Com 输出的的是值的拷贝，ES6 模块输出的是值的引用
Com 是运行时加载，ES6 是编译时输出接口
webpack 转换方式不同

能介绍一下缓存策略吗
强缓存 cache-control、express
协商缓存 304、ETag、modify
301、302、307、308的区别


### module、chunk、bundle 的区别
module - 各个源码文件，webpack 中一切皆模块
chunk - 多模块合并成的，如 entry import() splitChunk
bundle - 最终的输出文件

### loader 和 plugin 的区别
loader 模块转换器，如 less -> css
plugin 扩展插件，如 HtmlWebpackPlugin js或者css 塞进 html 中

### babel 和 webpack 的区别
babel - JS 新语法编译工具，不关心模块化
webpack - 打包构建工具，是多个 loader plugin 的集合

### bable-polyfill 和 bable-runtime 的区别
bable-polyfill 会污染全局
bable-runtime 不会污染全局
产出第三方 lib 要用 bable-runtime

### webpack 如何实现懒加载
import()

### 为何 Proxy 不能被 Polyfill
class 可以用 function 模拟
Promise 可以用 callback 来模拟
但 Proxy 的功能用 Object.defineProperty 无法模拟

### webpack 优化构建速度
优化 babel-loader （开启缓存cacheDirectory、明确范围include）
IgnorePlugin（plugins:[
    //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
	new Webpack.IgnorePlugin(/\.\/locale/,/moment/),
]）
noParse（当解析jq的时候，不会去解析jq这个库是否有依赖其他的包）
happyPack（将文件解析任务分解成多个子进程并发执行。）
ParallelUglifyPlugin（并行压缩代码）

### webpack-dev-server 原理和如何处理跨域
