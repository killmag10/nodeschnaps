// add node lib path
var nodeLibDir = __dirname + '/../../deps/node/lib';
global.module.paths.push(nodeLibDir);
module.paths.push(nodeLibDir);

// load process
global.process = {};
global.process = require('./node/process.js');
global.console = require('./node/Error.js');
global.console = require('./node/console.js');
