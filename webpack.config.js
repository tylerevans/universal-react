'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js',
    './app/styles/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
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
          ['react-transform', {
            'transforms': [{
              transform: 'react-transform-hmr',
              // If you use React Native, pass 'react-native' instead:
              imports: ['react'],
              // This is important for Webpack HMR:
              locals: ['module']
            }]
          }],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.min.css")
  ]
};
