var url = require('url');


const baseUrl = function (req) {
    var port = req.app.settings.port;
    return req.protocol + "://" + req.hostname + (port == 80 || port == 443 ? '' : ':' + process.env.APP_PORT);
}

const baseUrl2 = function (req) {
    var baseUrl2 = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        // pathname: req.originalUrl,
    });
    return baseUrl2
}

const isDebug = function () {
    return process.env.DEBUG === "true"
}


module.exports = {
    baseUrl,
    baseUrl2,
    isDebug
}