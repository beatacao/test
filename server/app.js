var express = require('express');
var path = require('path');
var klaw = require('klaw');
var _ = require('lodash')
var webpack = require('webpack')

var config = require('../config');
var webpackConfig = require('../build/webpack.dev.config')

// 静态文件目录
var staticDir  = path.join(__dirname, '../assets');
var index  = path.join(__dirname, '../');

var app = express();

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
})

// serve webpack bundle output
app.use(devMiddleware)

// 静态资源
app.use('/assets', express.static(staticDir));

app.use('/views/admin', express.static(path.join(__dirname, '../admin.html')));
app.use(/(^\/$)|(^(\/views).*$)/, express.static(index));

// mock api request
if (config.mock) {
    var methodFlag = ['$get', '$post', '$put', '$delete'];  //常用的四种请求方法
    var mockDir = path.join(__dirname, 'mock');

    var routers = {
        '/': {}
    };

    var error;
    var mockFiles = [];
    klaw(mockDir)
        .on('data', function (item) {
            //如果是js文件
            if (/^.*\.js$/.test(item.path)) {
                mockFiles.push(item.path);
            }
        })
        .on('end', function (){
            mockFiles.forEach(function (route) {
                try {
                    var routeObj = require(route); //获取mock文件夹里面的内容（对象）
                    if (routeObj.$router) {
                        delete routeObj.$route; //??why
                        routers[routeObj.$router] = routeObj;
                    } else {
                        routers['/'] = Object.assign({}, routers['/'], routeObj);
                    }
                }
                catch (e) {
                    error = e;
                    console.log(e);
                }
            });
            server(routers);
        });

    function resData(res, data) {
        res.json(data)
    }

    function server(routers) {
        Object.keys(routers).forEach(function (key) {
            var routerConfig = routers[key];
            var router = new express.Router();
            Object.keys(routerConfig).forEach(function (routeKey) {
                if (routeKey === '$route') return;
                var routeHandle = routerConfig[routeKey];
                //如果内容是一个函数
                if (_.isFunction(routeHandle)) {
                    router.use(routeKey, routeHandle);
                }  //如果内容是一个对象
                else if (_.isObject(routeHandle)) {
                    //如果$get/$post/$put/$delete中任一一个存在或者有值
                    if (methodFlag.some(function(item) {
                            return routeHandle[item];
                        })) {
                        methodFlag.forEach(function (item) {
                            if (routeHandle[item]) {
                                if (_.isFunction(routeHandle[item])) {
                                    router[item.toLowerCase().replace('$', '')](routeKey, routeHandle[item]);
                                }//如果$get或者其他的值是对象
                                else if (_.isObject(routeHandle[item])) {
                                    router[item.toLowerCase().replace('$', '')](routeKey, function(req, res, next){
                                        resData(res, routeHandle);
                                        next();
                                    })
                                }
                            }
                        });
                    }
                    else { //如果是个普通对象
                        router.use(routeKey, function (req, res, next) {
                            resData(res, routeHandle);
                            next();
                        })
                    }
                }//如果是字符串
                else if (_.isString(routeHandle)) {
                    router.use(routeKey, function (req, res, next) {
                        resData(res, routeHandle);
                        next();
                    })
                }
            });
            // 将路由挂载至应用
            app.use(path.join('/', key), router);
        });
    }
}

module.exports = app;

if (!module.parent) {
    app.set('port', config.port);
    app.listen(app.get('port'), function () {
        console.log('----- NodeJS Server started on port ' + config.port + ', press Ctrl-C to terminate.-----');
    });
}
