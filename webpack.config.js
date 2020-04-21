const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(pdf|png|svg|jpg|gif)$/, use: 'file-loader?name=[name].[ext]' }
    ]
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/images/headerImg.ico'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "API_KEY_NY_TIMES": JSON.stringify(process.env.API_KEY_NY_TIMES),
        "API_KEY_GOOGLE_BOOKS": JSON.stringify(process.env.API_KEY_GOOGLE_BOOKS)
      }
    })
  ]
}