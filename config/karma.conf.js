const webpackConfig = require('./webpack.config.dev');
const paths = require('./paths');
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

const config = {
  browsers: ['PhantomJS'],
  frameworks: ['mocha'],
  reporters: ['mocha'],
  files: [
    `${paths.tests}/**/*.spec.js`,
  ],
  preprocessors: {},
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true,
  },
}
config.preprocessors[`${paths.tests}/**/*.spec.js`] = ['webpack'];

module.exports = function configure(baseConfig) {
  baseConfig.set(config);
};
