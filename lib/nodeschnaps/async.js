/**
 * Async wrapper for internal usage.
 *
 * @module nodeschnaps/lib/async.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var Thread = require('./thread.js');
var timers = require('timers');

/**
 * A wrapper for async calls.
 *
 * @constructor
 */
var Async = function(){};

Async.prototype.call = function(runner,callback)
{
    var error = null;
    var result;
    var finished = false;
    
    var thread = new Thread(function(){
        try {
            result = runner();
        } catch(e) {
            error = e;
        }
        finished = true;
    })
    
    var watcher = function watcher()
    {
        if(true === finished) {
            callback(error,result);
        } else {
            timers.setImmediate(watcher);
        }
    }
    
};

module.exports = new Async();

