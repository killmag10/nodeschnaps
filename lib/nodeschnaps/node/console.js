/**
 * Console API Wrapper
 *
 * @module nodeschnaps/lib/node/console
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaThread = java.lang.Thread;

// Load Node modules
var assert = require('assert');
var util = require('util');

// Define variables
var consoleTimeDates = {};

/**
 * @constructor
 */
var Console = function()
{
};

/**
 * Prints to stdout with newline.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_log_data
 */
Console.log = function()
{
    process.stdout.write(
        util.format.apply(this, arguments) + '\n'
    );
};

/**
 * Same as console.log but prints to stderr.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_error_data
 */
Console.error = function()
{
    process.stderr.write(
        util.format.apply(this, arguments) + '\n'
    );
};

/**
 * Uses util.inspect on obj and prints resulting string to stdout.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_dir_obj
 */
Console.dir = function(obj)
{
    process.stdout.write(
        util.inspect(obj) + '\n'
    );
};

/**
 * Mark a time.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_time_label
 */
Console.time = function(label)
{
    consoleTimeDates[label] = new Date();
};

/**
 * Finish timer, record output.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_timeend_label
 */
Console.timeEnd = function(label)
{
    if (undefined === consoleTimeDates[label]) {
        throw new Error('No such label:' + label);
    }

    var diff = (new Date()).getTime() - consoleTimeDates[label].getTime();

    this.log(label + ': ' + diff + 'ms');
};

/**
 * Print a stack trace to stderr of the current position.
 *
 * @see http://nodejs.org/api/stdio.html#stdio_console_trace_label
 */
Console.trace = function(label)
{
    var output = ['Trace: ' + label];
    var stack = JavaThread.currentThread().getStackTrace();

    // Remove first element
    stack.shift();

    // Format and output the stack
    stack.forEach(function(item) {
        output.push('    at ' + String(item.toString()));
    });

    process.stdout.write(output.join('\n') + '\n');
};

// Alias some methods
Console.info = Console.log;
Console.warn = Console.error
Console.assert = assert.ok;

module.exports = new Console();

