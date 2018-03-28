const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = require('./paths');

const PUBLIC_PATH = '/';

const CONFIG_DEV = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      sinon: path.resolve('node_modules/sinon/pkg/sinon.js'),
    },
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    paths.examplesIndexJs,
  ],
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [paths.examplesSrc, paths.componentSrc, paths.tests],
        options: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }],
            }],
          ],
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          }
        ]
      },
    ],

  },
  output: {
    path: paths.examplesDist,
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      CONFIG: {
        basePath: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.examplesHtml,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  performance: {
    hints: false,
  },
  mode: 'development',
};

module.exports = CONFIG_DEV;
