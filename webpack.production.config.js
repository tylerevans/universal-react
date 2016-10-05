'use strict';

var DEBUG = process.env.DEBUG;

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

var SCRIPTS_ROOT = path.resolve(__dirname, './app');
var STYLES_ROOT = path.resolve(__dirname, './app/styles');

function combineCSS(extra) {
	return ExtractTextPlugin.extract([
      "css-loader"
    ]
    .concat(extra || [])
  );
}

module.exports = {
  entry: [
    './app/index',
    './app/styles/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}, {
      test: /\.(js|jsx)?$/,
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
      test: /\.scss$/,
      loader: combineCSS("sass?outputStyle=expanded&sourceMap&sourceMapContents")
    }, {
      test: /\.css$/,
      loader: combineCSS()
    }]
  },
  resolve: {
    extensions: [
      '.js', '.jsx',
    ],
    alias: {
      'te-scripts': SCRIPTS_ROOT,
      'te-styles': STYLES_ROOT
    }
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
