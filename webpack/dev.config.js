const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const path = require('path')


const exp = merge(baseConfig(), {
  devtool: 'cheap-module-source-map',
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: '8000',
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
})

module.exports = exp
