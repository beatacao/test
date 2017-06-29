var path = require('path');

module.exports = {
    "port": 7777,
    "mock": true,
    "assetsPublicPath": '/assets/',
    "mock": true,
    "build": {
        "assetsRoot": path.resolve(__dirname, '../assets'),
        "assetsPublicPath": "/assets/"
    }
}