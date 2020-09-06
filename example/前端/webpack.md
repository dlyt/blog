```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var pluginsConfig = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        $dxl: path.resolve(__dirname, "./lib/dxl.js"),    //dxl.js里面使用$dxl
        dxlHttp: path.resolve(__dirname, "./lib/constant.js") //constant.js里面使用dxlHttp
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        // chunkFilename: "css/[contenthash:12].css"
    }),
    new webpack.HotModuleReplacementPlugin()
]

//入口变量
var entryFormat = function (p) {
    var _p = {};

    p.forEach(function (item) {
        _p[item] = './src/' + item;
        pluginsConfig.push(new HtmlWebpackPlugin({
            chunks: [item], //添加引入的js,也就是entry中的key
            filename: `html/${item}.html`,
            minify: {
                collapseWhitespace: true //折叠空白区域 也就是压缩代码
            },
            // hash:true,
            template: `./src/${item}/index.html` //模板地址
        }), )
    });
    return _p;
}

module.exports = {
    entry: entryFormat(require('./page')),   //入口   导入page.js
    output: {
        path: path.join(__dirname, 'build'),
        // publicPath: "//s5.dxlfile.com/",
        filename: 'js/[name].js',
        chunkFilename: "js/[id].wwwn.js"
    },      //出口
    devServer: {
        contentBase: './build',
        hot: true,
        open: true          //自动打开浏览器
    },   //服务器
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=0&name=img/[name].[ext]'
            },
            {
                test: /\.html$/, use: ['html-loader']
            },
        ]
    },         //模块配置
    plugins: pluginsConfig,
    mode: 'development',    //可以更改模式 
    resolve: {//配置解析
        modules: [
            path.resolve(__dirname, "./lib"),
            path.resolve(__dirname, "./node_modules")
        ]
    }
}
```

### 前端为何要进行打包和构建
体积更小（Tree-ShaKing、压缩、合并），加载更快
编译高级语言或语法（TS、ES6+、模块化、scss）
兼容性和错误检查（Polyfill、postcss、eslint）

统一、高效的开发环境
统一的构建流程和产出标准
集成公司构建规范（提测、上线等）

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
IgnorePlugin
noParse
happyPack
ParallelUglifyPlugin