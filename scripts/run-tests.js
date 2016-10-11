var Server = require('karma').Server;
const path = require('path');
const commander = require('commander');
commander
  .version('1.0.0')
  .option('-w, --watch', 'keep karma running and watch for changes')
  .parse(process.argv);


new Server({
  configFile: path.resolve(__dirname, '../config/karma.conf.js'),
  singleRun: !commander.watch,
}, function (exitCode) {
  process.exit(exitCode)
}).start();

