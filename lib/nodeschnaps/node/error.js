/**
 * Dummy error class for node.js
 *
 * @module nodeschnaps/lib/node/error
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

var util = require('util');
var OldError = Error;

global.Error = function Error(message)
{
    this.message = message;

    this.stack = new String(
        new org.mozilla.javascript.JavaScriptException('Stack')
            .getScriptStackTrace()
    ).split('\n');
    this.stack.shift();
    this.stack = this.stack.map(function(item) {
        return item.replace(/^\t/,'    ');
    });
    this.stack = this.stack.join('\n');
}
util.inherits(global.Error, OldError);

/**
 * This is a dummy method for node.js
 */
global.Error.captureStackTrace = function()
{
};

