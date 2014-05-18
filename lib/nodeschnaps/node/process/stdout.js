/**
 * Process Stdout API Wrapper
 *
 * @module nodeschnaps/lib/node/process/stdout.js
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
var Stdout = function()
{
    stream.Writable.call(this);
};

// Extend stream.Writable
util.inherits(Stdout, stream.Writable);

/**
 * A Writable Stream to stdout.
 *
 * @see http://nodejs.org/api/process.html#process_process_stdout
 */
Stdout.prototype._write = function(chunk, encoding, callback)
{
    JavaSystem.out.print(chunk.toString());

    callback && callback(null);
};


module.exports = new Stdout();

