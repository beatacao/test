var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.config')

require('shelljs/global')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = config.build.assetsRoot
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) {
        throw err
    }
    console.log('------ build completed -------')
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
