const path = require('path')
const webpack = require('webpack')

const config = require('./config')
const {APP_ENV} = require('./constants')
const styleLoaders = require('./style-loaders')
const plugins = require('./plugins')
const {assetsPath, resolve} = require('./utils')
const optimization = require('./optimization')

module.exports = {
    mode: 'production',
    entry: {
        app: APP_ENV === 'dev'
            ? ['webpack-dev-server/client?http://0.0.0.0:9044', 'babel-polyfill', './src/app/main.js']
            : ['babel-polyfill', './src/app/main.js']
    },
    output: {
        path: config.assetsRoot,
        filename:
            APP_ENV === 'dev'
                ? '[name].js'
                : assetsPath('[name].[chunkhash].js'),
        chunkFilename:
            APP_ENV === 'dev'
                ? '[name].js'
                : assetsPath('[name].[id].[chunkhash].js'),
        publicPath: config.assetsPublicPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [resolve('src'), resolve('node_modules')],
        alias: {
            '@utils': resolve('src/utils'),
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@styles': resolve('src/styles')
        }
    },
    module: {
        rules: [
            ...styleLoaders,
            {
                test: /\.js(x?)$/,
                include: [resolve('src')],
                exclude: /node_modules/, // 不包括node_modules的
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: [
                                'react-hot-loader/babel'
                            ]
                        }
                    }
                    /*{
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true
                        }
                    }*/
                ]
            },
            // {
            //     test: /\.js?$/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             loader: 'eslint-loader',
            //             options: {
            //                 formatter: require('eslint-friendly-formatter')
            //             }
            //         }
            //     ],
            //     include: ['src']
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,// 图片 小于10k的转成base64的。
                    name: assetsPath('[name].[hash:7].[ext]')// 大于10k的，按照命名规则name hash的后7位，图片的扩展名不变
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,//矢量图
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsPath('[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins,
    optimization,
    devtool: config.sourceMap ? '#source-map' : false
}
