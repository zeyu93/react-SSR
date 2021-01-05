const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
//two configurations, 1 for client side bundle and 1 for server side
const browserConfig = {
  entry: "./src/browser/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "cheap-module-sorce-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: (url) => url.replace(/public/, ""),
        },
      },
      {
        test: [/\.css$/],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer()],
              },
            },
          ],
        }),
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react-app"],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css",
    }),
  ],
};

const serverConfig = {
  entry: "./src/server/index.js",
  taget: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  devtool: "cheap-module-sorce-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: (url) => url.replace(/public/, ""),
          emit: false,
        },
      },
      {
        test: [/\.css$/],
        use: [
          {
            loader: "css-loader/locals",
          },
        ],
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react-app"],
        },
      },
    ],
  },
};

module.exports = [browserConfig, serverConfig];
