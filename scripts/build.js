#!/usr/bin/env node
const path = require('path');
const commander = require('commander');
commander
  .version('0.0.1')
  .option('-w, --watch', 'starts the webpack dev server')
  .parse(process.argv);

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigExamplesDev = require('../config/webpack.config.dev');
const webpackConfigExamplesDist = require('../config/webpack.config.examples_dist');
const webpackConfigLibDist = require('../config/webpack.config.lib_dist');

function webpackServer(compiler) {
  new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, 'dist_examples'),
    publicPath: webpackConfigExamplesDev.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: false,
    stats: {
      modules: false,
      performance: false,
      colors: true,
    },
  }).listen(3000, 'localhost', err => {
    if (err) {
      return console.warn(err);
    }
    return null;
  });
}

if (commander.watch) {
  const compiler = webpack(webpackConfigExamplesDev);
  webpackServer(compiler);
} else {
  console.log('run the build...');
  const examplesCompiler = webpack(webpackConfigExamplesDist);
  const libCompiler = webpack(webpackConfigLibDist);
  examplesCompiler.run((err) => {
    if (err) {
      console.error('error building examples: ', err);
    } else {
      console.log('done building examples.');
    }
  });
  libCompiler.run((err) => {
    if (err) {
      console.error('error building lib: ', err);
    } else {
      console.log('done building lib.');
    }
  });
}
