// MIT © 2017 azu
"use strict";
var express = require('express');
var proxy = require('http-proxy-middleware');
/**
 * @return {Boolean}
 */
var filter = function(pathname, req) {
    return (pathname.match('^/') && req.method === 'GET');
};

function onProxyRes(proxyRes, req, res) {
    // remove for iframe
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['x-frame-options'];
}
// proxy middleware options
var options = {
    target: 'https://github.com', // target host
    changeOrigin: false,               // needed for virtual hosted sites
    onProxyRes: onProxyRes,
    logLevel: 'debug'
};

// create the proxy (without context)
var exampleProxy = proxy(filter, options);

// mount `exampleProxy` in web server
var app = express();
app.use('/', exampleProxy);
app.listen(3000);