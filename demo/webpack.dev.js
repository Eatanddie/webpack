const webpack = require('webpack')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        overlay: true,
        contentBase: './dist',
        open: true,
        port: 8088,
        proxy: {
            '/react/api': {
                target: 'https://www.dell-lee.com',
                secure: false,
                pathRewrite: {
                    'header.json': 'demo.json'
                },
                changeOrigin: true,
                // headers: {
                //     host: ''
                // }
            }
        },
        hot: true,
        historyApiFallback: true,
        // hotOnly: true
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
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
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = devConfig