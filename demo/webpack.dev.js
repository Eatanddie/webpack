const webpack = require('webpack')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        hot: true,
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