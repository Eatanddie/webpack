const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: ''
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        open: true,
        compress: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            cache: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    // externals: {
    //     jquery: '$'
    // }, 
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'
            //         }
            //     },
            // },
            {
                test: /\.(png|jpg|gif)$/, 
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: 'img/',
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ['@babel/plugin-proposal-class-properties', { "loose": true}],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}