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
    {pattern: `${paths.examplesSrc}/**/*.js`, included: false, served: false},
    {pattern: `${paths.componentSrc}/**/*.js`, included: false, served: false},
  ],
  preprocessors: {},
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true,
  },
  eslint: {
    stopOnWarning: true,
  },
}
config.preprocessors[`${paths.tests}/**/*.spec.js`] = ['eslint', 'webpack'];
config.preprocessors[`${paths.examplesSrc}/**/*.js`] = ['eslint'];
config.preprocessors[`${paths.componentSrc}/**/*.js`] = ['eslint'];

module.exports = function configure(baseConfig) {
  baseConfig.set(config);
};
