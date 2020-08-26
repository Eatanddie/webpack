const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    // 源码映射 单独生成一个 source-map文件 出错会标识出错的列和行 大和全
    // devtool:'source-map', 
    // 不会单独生成一个文件 但会显示行和列
    // devtool: 'eval-source-map',
    // 不会产生单独列 但会生成一个映射文件
    // devtool: 'cheap-module-source-map', 
    // 不会单独生成文件 集成在打包文件中 也不产生列
    devtool: 'cheap-module-eval-source-map',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {
        //             '/api': '/'
        //         }
        //     }  
        // } 

        // before(app) { 
        //     app.get('/user', (req, res) => {
        //         res.json({
        //             name: 'myname-before'
        //         })
        //     })
        // } 
    },
    // 监控 实时打包   
    // watch: true,
    // 监控的选项
    // watchOptions: {
    //     poll: 1000, // 每秒问1000次
    //     aggregateTimeout: 500 ,// 防抖 
    //     ignored: /node_modules/ // 忽略哪个文件
    // }, 

    // 解析第三方模块 
    resolve: {
        // 指定解析的模块
        // modules: [path.resolve('node_modules')],
        // mainFiles: [], 指定入口文件的名字 默认找index.js
        // mainFields: ['style', 'main'], 指定查找文件
        // 查找文件扩展名，依次解析 
        // extensions: ['.js', '.css', '.json'],
        // 别名  
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        // 设置开发环境
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'home.html',
            // 代码块 放置引入内容
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'other.html',
            chunks: ['other']
        }),
        // 版权声明
        new webpack.BannerPlugin('make by me ,i will become success!')
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: './public',
        //             to: './dist'
        //         },
        //     ],
        // }),
    ]
}