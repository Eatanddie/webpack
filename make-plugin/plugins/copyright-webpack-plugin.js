class CopyrightWebpackPlugin {
    constructor(options) {
        console.log(options)
    }

    apply(compiler) {
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilationParams) => {
            console.log('compile')
        })

        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            debugger
            compilation.assets['copyright.txt'] = {
                source: function() {
                    return 'copyright by test'
                },
                size: function() {
                    return 14
                }
            }
            cb()
        })
    }
}

module.exports = CopyrightWebpackPlugin