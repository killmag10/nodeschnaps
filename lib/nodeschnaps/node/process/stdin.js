/**
 * Process Stdout API Wrapper
 *
 * @module nodeschnaps/lib/node/process/stdout.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaString = java.lang.String;
var JavaSystem = java.lang.System;
var JavaReflectArray = java.lang.reflect.Array
var JavaLangByte = java.lang.Byte;

// Load Node modules
var util = require('util');
var stream = require('stream');
var Buffer = require('buffer').Buffer;

/**
 * @constructor
 */
var Stdin = function()
{
    stream.Readable.call(this);
};

// Extend stream.Readable
util.inherits(Stdin, stream.Readable);

/**
 * A Readable Stream to stdin.
 *
 * @see http://nodejs.org/api/process.html#process_process_stdin
 */
Stdin.prototype._read = function(size)
{
    var buffer = JavaReflectArray.newInstance(
        JavaLangByte.TYPE,
        size
    );

    JavaSystem.in.read(buffer);

    this.push(
        new Buffer(
            String(
                new JavaString(buffer)
            ),
            'binary'
        )
    );
};


module.exports = new Stdin();

