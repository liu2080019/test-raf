const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/test-raf'),
    publicPath: '/test-raf/',
    filename: '[name]-[hash:6].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json'],
    modules: ['.', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            {
              loader: 'css-loader', options: {
                sourceMap: true,
              },
            }, {
              loader: 'less-loader', options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      title: '测试raf',
      filename: 'index.html',
      template: './index.ejs',
      chunks: ['polyfill', 'index'],
      alwaysWriteToDisk: true,
      inject: 'body',
    }),
    new ExtractTextPlugin('[name]-[hash:6].css', {
      allChunks: true,
    }),
  ],
};
