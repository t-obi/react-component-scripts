const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const libraryName = require(paths.appPackageJson).name;
const PUBLIC_PATH = `/${libraryName}`;

const CONFIG_EXAMPLE_DIST = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: [
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
        include: [paths.examplesSrc, paths.componentSrc],
        options: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
          ],
        },
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
    ]
  },
  output: {
    path: paths.examplesDist,
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      CONFIG: {
        basePath: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.examplesHtml,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = CONFIG_EXAMPLE_DIST;
