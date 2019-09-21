const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const base_config = require('./webpack.config.base');

module.exports = Object.assign(base_config, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist/test-raf'),
    publicPath: '/',
    filename: '[name]-[hash:6].bundle.js',
  },
  devServer: {
    contentBase: './dist/test-raf',
    publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: base_config.plugins.concat([
    new DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('dev'),
          BASE_URL: JSON.stringify('http://test-test-raf-api.etouch.cn/test-raf'),
          CAS_URL: JSON.stringify('http://test.zhwnl.cn/cas/login'),
        },
      },
    })
  ])
})
