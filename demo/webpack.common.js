const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    performance: false,
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        }, {
            test: /\.(woff|eot|ttf|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'font/',
                }
            }
        }, { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            use: ['babel-loader', 'eslint-loader'],
            options: {
                // presets: [['@babel/preset-env', {
                //     useBuiltIns: 'usage',
                //     targets: {
                //         edge: '17',
                //         firefox: '60',
                //         chrome: '67',
                //         safari: '11.1'
                //     }
                // }]]
                // plugins: [['@babel/plugin-transform-runtime', {
                //     corejs: 2,
                //     helpers: true,
                //     regenerator: true,
                //     useESModules: false
                // }]]
            } 
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }), 
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    optimization: {
        usedExports: true,
        // minimizer: [
        //     new UglifyJsPlugin()
        // ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: false,
                default: false
            }
        }
    }
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}