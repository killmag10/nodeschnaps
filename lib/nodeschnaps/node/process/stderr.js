/**
 * Process Stderr API Wrapper
 *
 * @module nodeschnaps/lib/node/process/stderr.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaSystem = java.lang.System;

// Load Node modules
var util = require('util');
var stream = require('stream');

/**
 * @constructor
 */
var Stderr = function()
{
    stream.Writable.call(this);
};

// Extend stream.Writable
util.inherits(Stderr, stream.Writable);

/**
 * A Writable Stream to stdout.
 *
 * @see http://nodejs.org/api/process.html#process_process_stderr
 */
Stderr.prototype._write = function(chunk, encoding, callback)
{
    JavaSystem.err.print(chunk.toString());

    callback && callback(null);
};


module.exports = new Stderr();

