const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');

const PUBLIC_PATH = '/react-video-cover';
const libraryName = require(paths.appPackageJson).name;

const CONFIG_LIB_DIST = {
  resolve: {
    extensions: ['.js'],
  },
  entry: [
    paths.componentIndexJs,
  ],
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
          ],
        },
      }
    ]
  },
  output: {
    path: paths.componentDist,
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      CONFIG: {
        basePath: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

};

module.exports = CONFIG_LIB_DIST;
