var path = require('path');
const webpack = require('webpack');
const JsDocPlugin = require('jsdoc-webpack-plugin-v2');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'procvis.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { failOnError: true }
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "test"),
          path.resolve(__dirname, "node_modules")
        ],
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  plugins: [
    new JsDocPlugin({
      conf: path.join(__dirname, 'jsdoc.conf.json'),
    })
  ]
};
