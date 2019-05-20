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