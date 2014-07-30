/**
 * Async wrapper for internal usage.
 *
 * @module nodeschnaps/lib/async.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java Classes
var Synchronizer = org.mozilla.javascript.Synchronizer;

var Thread = require('./thread.js');
var timers = require('timers');
var vm = require('vm');

/**
 * A wrapper for async calls.
 *
 * @constructor
 */
var Async = function(){};

/**
 * Do a async call.
 *
 * @param {Function} runner - the function to run.
 * @param {Function} callback - the callback function on success or error.
 */
Async.prototype.call = function(runner,callback)
{
    /**
     * Thread communication object.
     */
    var result = {
        "runner" : runner,
        "error" : null,
        "finish" : new Boolean(false),
        "result" : undefined
    };

    // Create a thread for the runner function.
    var thread = new Thread(function(){
        var sandbox = function()
        {
            var self = this;

            try {
                self.result = self.runner();
            } catch(e) {
                self.error = e;
            }

            var sync = function()
            {
                self.finish = new Boolean(true);
            }
            sync = new Synchronizer(sync);
            sync();
        };

        sandbox.call(result);
    });

    /**
     * Watch if the thread is finished and than call the callback.
     */
    var watcher = function watcher()
    {
        if(result.finish.valueOf()) {
            timers.setImmediate(callback, result.error, result.result);
        } else {
            timers.setImmediate(watcher);
        }
    };

    // Start the thread and the watcher.
    timers.setImmediate(thread.start);
    watcher();
};

module.exports = new Async();

