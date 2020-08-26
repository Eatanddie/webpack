const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)

const app = express()
app.use(webpackDevMiddleware(compiler))

app.get('/api/user', (req, res) => {
    res.json({
        name: 'test'
    })
})

app.listen(3000)