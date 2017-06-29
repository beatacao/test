/* global require, module, __dirname */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('../config')
const projectRoot = path.resolve(__dirname, '../')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    context: path.join(__dirname, '../src'),
    entry: {
        'admin': ['./admin.js'],
        'app': ['./app.js'],
        'vendor': ['vue', 'vue-router', 'vuex-router-sync', 'axios', 'jquery', 'bootstrap/dist/js/bootstrap', 'lodash',
                '~assets/js/util', "jquery-form/src/jquery.form", "~assets/js/pagination",
                '~assets/tourism/css/bootstrap.css', '~assets/tourism/css/bootstrap-responsive.css', '~assets/tourism/css/style.css',
                '~assets/tourism/css/neithicon-icon.css', '~assets/tourism/css/layer.css', '~assets/css/main.css',
                'nprogress/nprogress.css']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.assetsPublicPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[id].chunk.js'
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        modules: [
            path.join(__dirname, '../node_modules'),
        ],
        alias: {
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api'),
            '~views': path.resolve(__dirname, '../src/views'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~assets': path.resolve(__dirname, '../src/assets')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules'),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: projectRoot,
                exclude: [/node_modules/, /assets\/js/]
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'staticimg/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', 'window.jQuery': 'jquery', '_': 'lodash'}),
        new CopyWebpackPlugin([{from: '../src/assets/img', to: 'img'}]),
        new webpack.LoaderOptionsPlugin({
            minimize: isProd,
            options: {
                context: __dirname,
                vue: {
                        css: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader'}),
                        less: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader!less-loader'})
                    }
            }
        }),
    ]
}
