/** 
 * this is adapted from react-scripts / create-react-app,
 * see https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts
 */

var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

// config before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
  componentDist: resolveApp('dist/lib'),
  examplesDist: resolveApp('dist/examples'),
  examplesSrc: resolveApp('examples'),
  componentSrc: resolveApp('lib'),
  componentIndexJs: resolveApp('lib/index.js'),
  tests: resolveApp('tests'),
  examplesHtml: resolveApp('examples/index.html'),
  examplesIndexJs: resolveApp('examples/main.js'),
  appPackageJson: resolveApp('package.json'),
  
  appNodeModules: resolveApp('node_modules'),
  // this is empty with npm3 but node resolution searches higher anyway:
  ownNodeModules: resolveOwn('../node_modules'),
  nodePaths: nodePaths,
  
};

// config before publish: we're in ./packages/react-scripts/config/
if (__dirname.indexOf(path.join('packages', 'react-component-scripts', 'config')) !== -1) {
  module.exports = {
    componentDist: resolveApp('../../../dist/lib'),
    examplesDist: resolveApp('../../../dist/examples'),
    examplesSrc: resolveApp('../../../examples'),
    componentSrc: resolveApp('../../../lib'),
    componentIndexJs: resolveApp('../../../lib/index.js'),
    tests: resolveApp('../../../tests'),
    examplesHtml: resolveApp('../../../examples/index.html'),
    examplesIndexJs: resolveApp('../../../examples/main.js'),
    appPackageJson: resolveApp('../package.json'),

    appNodeModules: resolveOwn('../node_modules'),
    ownNodeModules: resolveOwn('../node_modules'),
  };
}
