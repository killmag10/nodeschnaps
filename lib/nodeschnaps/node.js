// add node lib path
var nodeLibDir = __dirname + '/../../deps/node/lib';
global.module.paths.push(nodeLibDir);
module.paths.push(nodeLibDir);

// load process
global.process = {};
global.process = require('./node/process.js');
require('./node/Error.js');
global.console = require('console.js');

global.setTimeout = require('timers').setTimeout;
global.clearTimeout = require('timers').clearTimeout;
global.setInterval = require('timers').setInterval;
global.clearInterval = require('timers').clearInterval;
