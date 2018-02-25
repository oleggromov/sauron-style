const path = require('path')
const webpack = require('webpack')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const WITH_MINIFICATION = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

module.exports = {
  entry: path.resolve(__dirname, 'src/sauron-style.js'),
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    library: 'SauronStyle',
    libraryTarget: 'window',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'build'),
    filename: IS_PRODUCTION ? 'sauron-style.min.js' : 'sauron-style.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: IS_PRODUCTION ? WITH_MINIFICATION : []
}
