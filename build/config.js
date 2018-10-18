const path = require('path')
const {APP_ENV} = require('./constants')
const env = require('./env.json')

if (APP_ENV === 'dev') {
    const host = require('./getHost')

    env[APP_ENV].feRoot = env[APP_ENV].feRoot.replace('localhost', host)
}

module.exports = {
    assetsPublicPath: env[APP_ENV].feRoot,
    assetsSubDirectory: '',
    title: 'redux',
    urlPrefix: '/'
}
