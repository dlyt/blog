### 前端为何要进行打包和构建

体积更小（Tree-ShaKing、压缩、合并），加载更快
编译高级语言或语法（TS、ES6+、模块化、scss）
兼容性和错误检查（Polyfill、postcss、eslint）

统一、高效的开发环境
统一的构建流程和产出标准
集成公司构建规范（提测、上线等）

### Tree-shaking 的实现原理

利用 ES6 模块特性：
只能作为模块顶层的语句出现
import 的模块名只能是字符串常量
import bingding 是 immutable 的，引入的模块不能再进行修改
代码删除：
uglify：判断程序流，判断变量是否被使用和引用，进而删除代码
实现原理概述：
ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了哪些模块
静态分析程序流，判断哪些模块和变量未被使用或者引用，进而删除对应代码
备注：
Tree-shaking 不支持 CommonJs，所以需要配置不转义`options: { presets: [ [ 'es2015', { modules: false } ] ] }`
如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。`{"name": "tree-shaking","sideEffects": false}`

### CommonJS 和 ES6 Module 的区别

Com 输出的的是值的拷贝，ES6 模块输出的是值的引用
Com 是运行时加载，ES6 是编译时输出接口
webpack 转换方式不同

能介绍一下缓存策略吗
强缓存 cache-control、express
协商缓存 304、ETag、modify
301、302、307、308 的区别

### module、chunk、bundle 的区别

module - 各个源码文件，webpack 中一切皆模块
chunk - 多模块合并成的，如 entry import() splitChunk
bundle - 最终的输出文件

### loader 和 plugin 的区别

loader 转换器，如 less -> css，单纯的文件转换过程。
plugin 是一个扩展器，它丰富 weboack 本身，针对的是 loader 结束后，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务。如 HtmlWebpackPlugin js 或者 css 塞进 html 中

### babel 和 webpack 的区别

babel - JS 新语法编译工具，不关心模块化
webpack - 打包构建工具，是多个 loader plugin 的集合

### babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析的

input => tokenizer => token，先对输入代码进行分词，根据最小有效语法单元，对字符串进行切割。
tokens => parser => AST，然后进行语法分析，会涉及到读取、暂存、回溯、暂存点销毁等操作。
AST => transformer => newAST，然后转换生成新的 AST。
newAST => codeGenerator => output，最后根据新生成的 AST 输出目标代码。

### babel 实现原理

解析成 AST 树 => 转换成新的 AST 树 => 生成新的 AST 树

### AST 是如何生成的

AST 是通过 JS Parser（解析器），将 js 源码转换为抽象语法树，主要分为二步：分词，语义分析。
分词：将整个的代码字符串，分割成 语法单元数组（token）。
语义分析：语义分析的目的是将分次得到的语法单元进行一个整体的组合，分析确定语法单元之间的关系。

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

使用 externals 方案及引入 cdn
优化模块查找路径
优化 loader 配置：include，exclude
拆成几个小块，单独构建
source map
DLL：把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下， 动态库不需要重新打包，每次构建只重新打包业务代码。
多进程

优化 babel-loader （开启缓存 cacheDirectory、明确范围 include）
IgnorePlugin（plugins:[
//moment 这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
new Webpack.IgnorePlugin(/\.\/locale/,/moment/),
]）
noParse（当解析 jq 的时候，不会去解析 jq 这个库是否有依赖其他的包）
happyPack（将文件解析任务分解成多个子进程并发执行。）
ParallelUglifyPlugin（并行压缩代码）

### webpack-dev-server 原理和如何处理跨域

1. 当修改了文件；
2. webpack-dev-middleware 调用 webpack 的 API 对文件系统进行监听，接收更改并通知 webpack 保存到内存中（outputFileSystem 替换 MemoryFileSystem）；
3. webpack-dev-server 调用 webpack 监听 compile 的 `done` 事件；通过 `_sendStatus` 发送新模块的 hash 到浏览器；
4. HotModuleReplacement.runtime 对模块进行热更新
5. webpack 接收到最新 hash 值验证并通过 jsonp 请求模块代码(先获取 hotDownloadManifest，然后 jsonp hotDownloadUpdateChunk)；
6. 删除过期的模块和依赖，重新 installedModules 子模块，然后替换修改。

如何处理跨域：
利用`http-proxy-middleware`
