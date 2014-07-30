// Load Java Classes
var Synchronizer = org.mozilla.javascript.Synchronizer;
var nodeLibDir = global.module.paths[global.module.paths.length-1];

// Get the timers module
module.exports = require(nodeLibDir + '/timers');

// Synchronize immediate functions.
module.exports.setImmediate = Synchronizer(module.exports.setImmediate);
module.exports.clearImmediate = Synchronizer(module.exports.clearImmediate);
