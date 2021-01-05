const webpack = require("webpack");

//two configurations, 1 for client side bundle and 1 for server side
const browserConfig = {
    entry: "./src/browser/index.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    devtool: "cheap-module-sorce-map",
    module: {
        rules: []
    }
};

const serverConfig = {
    entry: "./src/server/index.js",
    taget: "node",
    output: {
        path: __dirname,
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-sorce-map",
    module: {
        rules: []
    }
};

module.exports = [browserConfig, serverConfig];
