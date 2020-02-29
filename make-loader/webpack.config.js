const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', './loaders/']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'replaceLoader'
                },
                {
                    loader: 'replaceLoaderAsync',
                    options: {
                        name: '111'
                    }
                }
            ]
        }]
    }
}