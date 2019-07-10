const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js'
        // sub: './src/index.js'
    },
    output: {
        // publicPath: 'http://cdn.com.cn',
        publicPath: '/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        hot: true,
        hotOnly: true
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
        }, {
            test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						// modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
        }, {
            test: /\.css$/,
			use: [
				'style-loader', 
                'css-loader',
                'postcss-loader'
			]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), 
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
}