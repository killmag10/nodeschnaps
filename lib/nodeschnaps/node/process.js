/**
 * Process API Wrapper
 *
 * @module nodeschnaps/lib/node/process
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaSystem = java.lang.System;
var JavaManagementFactory = java.lang.management.ManagementFactory;

// Load Node modules
var util = require('util');
var events = require('events');

/**
 * @constructor
 */
var Process = function()
{
    events.EventEmitter.call(this);
};

// Extend the EventEmitter
util.inherits(Process, events.EventEmitter);

// Init prototype namespaces
Process.prototype.stdout = require('./process/stdout.js');
Process.prototype.stderr = require('./process/stderr.js');
Process.prototype.env = {};

// Setup statics
Process.prototype.argv = [];
Process.prototype.execPath = String(
    JavaSystem.getProperty('java.home') + '/bin/java'
);
Process.prototype.execArgv = [];

Process.prototype.version = '0.10.28';
Process.prototype.versions = {
    node: Process.prototype.version,
    modules: '11'
};

Process.prototype.noDeprecation = false;
Process.prototype.traceDeprecation = false;

Process.prototype.arch = String(
    JavaSystem.getProperty('os.arch').toLowerCase()
);
Process.prototype.platform = String(
    JavaSystem.getProperty('os.name').toLowerCase()
);

/**
 * This causes node to emit an abort.
 * This will cause node to exit and generate a core file.
 *
 * @see http://nodejs.org/api/process.html#process_process_abort
 */
Process.prototype.abort = function()
{
    this.exit(1);
};

/**
 * Changes the current working directory of the
 * process or throws an exception if that fails.
 *
 * @see http://nodejs.org/api/process.html#process_process_chdir_directory
 * @todo Check if path exits and is a directory
 */
Process.prototype.chdir = function(directory)
{
    JavaSystem.setProperty('user.dir', directory);
};

/**
 * Returns the current working directory of the process.
 *
 * @see http://nodejs.org/api/process.html#process_process_cwd
 */
Process.prototype.cwd = function()
{
    return String(JavaSystem.getProperty('user.dir'));
};

/**
 * Ends the process with the specified code.
 * If omitted, exit uses the 'success' code 0.
 *
 * @see http://nodejs.org/api/process.html#process_process_exit_code
 */
Process.prototype.exit = function(code)
{
    JavaSystem.exit(
        undefined === code ? 0 : code
    );
};

/**
 * Returns an object describing the memory
 * usage of the Node process measured in bytes.
 *
 * @see http://nodejs.org/api/process.html#process_process_memoryusage
 */
Process.prototype.memoryUsage = function()
{
    var runtime = java.lang.Runtime.getRuntime();

    return {
        rss: Number(runtime.maxMemory()),
        heapTotal: Number(runtime.totalMemory()),
        heapUsed: Number(runtime.totalMemory() - runtime.freeMemory())
    };
};

// TODO: Process.prototype.stdin need to implement
// TODO: Process.prototype.env need to implement
// TODO: Process.prototype.getgid()
// TODO: Process.prototype.setgid(id)
// TODO: Process.prototype.getuid()
// TODO: Process.prototype.setuid(id)
// TODO: Process.prototype.getgroups()
// TODO: Process.prototype.setgroups(groups)
// TODO: Process.prototype.initgroups(user, extra_group)
// TODO: Process.prototype.pid
// TODO: Process.prototype.title

/**
 * Should run on the next tick but in the moment it's only a setTimeout
 * that is set to a timeout of 0.
 *
 * @see http://nodejs.org/api/process.html#process_process_nextTick
 */
Process.prototype.nextTick = function(callback)
{
    var args = Array.slice(arguments);

    args.shift();
    args.unshift(0);
    args.unshift(callback);

    setTimeout.apply(args);
}

// TODO: Process.prototype.maxTickDepth
// TODO: Process.prototype.umask([mask])

/**
 * Number of seconds Node has been running.
 *
 * @see http://nodejs.org/api/process.html#process_process_uptime
 */
Process.prototype.uptime = function()
{
    return Number(JavaManagementFactory.getRuntimeMXBean().getUptime());
};

// TODO: Process.prototype.process.hrtime()
// TODO: Process.prototype.kill(pid, [signal])
// IGNORED: Process.prototype.config

// Events
// TODO: Event: 'exit'
// TODO: Event: 'uncaughtException'

/**
 * Internal method to load bindings.
 *
 * @internal
 * @param {String} name - Binding name to load
 * @return {Mixed}
 */
Process.prototype.binding = function(name)
{
    return require('./binding/' + name + '.js');
};

/**
 * Internal variable for _immediateCallback property.
 *
 * @internal
 */
var _immediateCallback = false;

Process.prototype._needImmediateCallback = false;

/**
 * Internal property for Immediate.
 *
 * @internal
 */
Object.defineProperty(Process.prototype, '_immediateCallback', {
    get : function() {
        return _immediateCallback;
    },
    set : function(value) {
        var self = this;

        _immediateCallback = value;
        if (_immediateCallback instanceof Function) {
            // Callback war's set, so we create a timer.
            setTimeout(function immediateCallbackWrapper() {
                self._needImmediateCallback && _immediateCallback();
                if (self._needImmediateCallback) {
                    // Wohooo more work to do, so we make it again.
                    setTimeout(immediateCallbackWrapper);
                }
            });
        }
    }
});

module.exports = new Process();
