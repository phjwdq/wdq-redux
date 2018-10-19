const path = require('path')
const {APP_ENV} = require('./constants')
const env = require('./env.json')

if (APP_ENV === 'dev') {
    const host = require('./getHost')

    env[APP_ENV].feRoot = env[APP_ENV].feRoot.replace('localhost', host)
}

module.exports = {
    index: path.resolve(__dirname, './../views/index.html'),
    assetsRoot: path.resolve(__dirname, './../public'),
    assetsPublicPath: env[APP_ENV].feRoot,
    assetsSubDirectory: '',
    sourceMap: APP_ENV !== 'test',
    extractCss: APP_ENV !== 'dev',
    bundleAnalyzerReport: env[APP_ENV].report,
    title: 'redux',
    urlPrefix: '/'
}
