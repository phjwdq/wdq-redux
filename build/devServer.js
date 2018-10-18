/**
 * @file devServer
 * @author luwenlong
 */

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config')
const host = require('./getHost')

const compiler = webpack({...config, mode: 'development'})

const port = '9044'

const server = new WebpackDevServer(compiler, {
    open: false,
    compress: true,
    historyApiFallback: {
        index: 'tpl/index.html'
    },
    contentBase: "../",
    quiet: false,
    noInfo: false,
    hot: true,
    hotOnly: true,
    inline: true,
    lazy: false,
    progress: false,
    disableHostCheck: true,
    watchOptions: {
        aggregateTimeout: 300
    },
    host: host,
    port: port,
    before: function (app) {

    },
    proxy: {

    }
})

server.listen(port, host, function() {
    console.log('server is running on http://%s:%s', host, port)
})
