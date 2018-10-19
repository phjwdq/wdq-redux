const {APP_ENV} = require('./constants')

module.exports =
    APP_ENV === 'dev'
        ? {}
        : {
            runtimeChunk: {
                name: 'manifest'
            },
            splitChunks: {// 分包管理
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        }
