const webpackConfig = require('./webpack.config.dev');
const paths = require('./paths');
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

const foo = {
  browsers: ['PhantomJS'],
  frameworks: ['mocha'],
  reporters: ['mocha'],
  files: [
    `${paths.tests}/**/*.spec.js`,
  ],
  preprocessors: {
    //`${paths.tests}/**/*.spec.js`: ['webpack'],
  },

  webpack: webpackConfig,
  webpackServer: {
    noInfo: true,
  },
}
foo.preprocessors[`${paths.tests}/**/*.spec.js`] = ['webpack'];

module.exports = function configure(config) {
  console.log('>>>>> config: ', foo);
  config.set(foo);
};
