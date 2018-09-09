const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      "env"
    ],
    plugins: [
      "transform-object-rest-spread",
      "transform-class-properties"
    ]
  }
};

module.exports = () => ({
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          babelLoader
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
})
