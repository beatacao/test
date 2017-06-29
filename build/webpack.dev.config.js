/* global require, module */
const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')


module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        },  {
            test: /\.less/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
        }]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'} }),
        new FriendlyErrorsPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
         new ExtractTextPlugin('css/[name].css'),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'app',
            ],
            filename: 'index.html',
            template: '../index.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'admin',
            ],
            filename: 'admin.html',
            template: '../admin.html',
            inject: true,
        })
    ],
})
