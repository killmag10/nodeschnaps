/**
 * Setup node.js compatibility environment
 *
 * @module nodeschnaps/lib/node
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Add node lib path
var nodeLibDir = __dirname + '/../../deps/node/lib';
global.module.paths.push(nodeLibDir);
module.paths.push(nodeLibDir);

// Load global buffer class.
global.Buffer = require('buffer').Buffer;
// Wrap process
global.process = {};
global.process = require('./node/process.js');
require('./node/error.js');
global.console = require('console.js');

// Wrap timer methods
global.setTimeout = require('timers').setTimeout;
global.clearTimeout = require('timers').clearTimeout;
global.setInterval = require('timers').setInterval;
global.clearInterval = require('timers').clearInterval;
global.setImmediate = require('timers').setImmediate;
global.clearImmediate = require('timers').clearImmediate;

var Main = require('./main.js');
var main = new Main();

global.NodeJS = main.runMain;
