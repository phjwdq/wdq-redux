const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const {APP_ENV} = require('./constants')
const config = require('./config')
const { assetsPath } = require('./utils')
const env = require('./env.json')

const oriEnv = env[APP_ENV]

Object.assign(oriEnv, {APP_ENV})

// 将webpack下发变量置于process.env
const defineEnv = {}
for (let key in oriEnv) {
    defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

const basePlugins = [
    new webpack.DefinePlugin(defineEnv),
]

// 注入模板中的变量
const injectVars = {
    title: config.title,
    feRoot: config.feRoot,
    urlPrefix: config.urlPrefix
}

const devPlugins = [
    new HtmlWebpackPlugin({
        ...injectVars,
        filename: 'index.html',
        template: 'build/tpl/index.html',
        inject: true
    })
]

const prodPlugins = [
    new webpack.WatchIgnorePlugin([/styl\.d\.ts$/]),
    new HtmlWebpackPlugin({
        ...injectVars,
        filename: config.index,
        template: 'build/tpl/index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].[id].[hash].css"//分包管理 name-id-md5
    }),
]

if (config.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = basePlugins.concat(APP_ENV === 'dev' ? devPlugins : prodPlugins)
