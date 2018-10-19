const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = require('./config')
const {resolve} = require('./utils')

let cssModuleAffix = '[path]___[name]__[local]___[hash:base64:7]'

module.exports = config.extractCss
    // pro
    ? [
        {
            test: /\.css$/,
            include: [resolve('node_modules')],
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.css$/,
            include: [resolve('src')],// src下的css文件
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader?importLoaders=1&modules&localIdentName=" + cssModuleAffix,
                "postcss-loader?values=true"
            ]
        },
        {
            test: /\.styl$/,
            include: resolve('src'),
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader?importLoaders=1&modules&localIdentName=" + cssModuleAffix,
                "postcss-loader?values=true&sourceMap=true",
                "stylus-loader"
            ]
        }
    ]
    // dev
    : [
        {
              test: /\.css$/,
              include: [resolve('node_modules')],
              use: ['style-loader', 'css-loader']
        },
        {
            test: /\.css$/,
            include: [resolve('src')],
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.styl$/,
            include: resolve('src'),
            rules: [
                {
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {//参数 同之上拼接的参数一样
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: cssModuleAffix
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                values: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        }
    ]
