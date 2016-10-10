#!/usr/bin/env node
var spawn = require('cross-spawn');
var script = process.argv[2];
var args = process.argv.slice(3);

switch (script) {
case 'start':
  var result = spawn.sync(
    'node',
    [require.resolve('../scripts/build-examples')].concat('--watch'),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
  break;
case 'build-examples':
  var result = spawn.sync(
    'node',
    [require.resolve('../scripts/build-examples')],
    {stdio: 'inherit'}
  );
  process.exit(result.status);
  break;
default:
  console.log('Unknown script "' + script + '".');
  break;
}
