var Server = require('karma').Server;
const path = require('path');

new Server({
  configFile: path.resolve(__dirname, '../config/karma.conf.js'),
  singleRun: true
}, function (exitCode) {
  console.log('Karma has exited with ' + exitCode)
  process.exit(exitCode)
}).start();

