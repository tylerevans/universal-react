'use strict';

var DEBUG = process.env.DEBUG;

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: [
    './app/index',
    './app/styles/style.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['transform-object-assign']
        ]
      }
    }, {
      test: /\.(woff2?|svg)$/,
      loader: 'url?limit=10000'
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.css$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader"
      })
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin("style.min.css")
  ]
};
