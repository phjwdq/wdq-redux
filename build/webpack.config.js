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
                exclude: /node_modules/,
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
                    limit: 10000,
                    name: assetsPath('[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
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
