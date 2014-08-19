/**
 * Process API Wrapper
 *
 * @module nodeschnaps/lib/node/process
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaSystem = java.lang.System;
var JavaManagementFactory = java.lang.management.ManagementFactory;
var JavaRuntime = java.lang.Runtime;

// Load Node modules
var util = require('util');
var events = require('events');

// Private functions
var getPid = function()
{
    return Number(
        JavaManagementFactory.getRuntimeMXBean().getName().split("@")[0]
    );
};

/**
 * Return all environment variables as key value object.
 *
 * @return {Object} key => value environment variables,
 */
var getEnv = function()
{
    var env = {};

    JavaSystem.getenv().entrySet().toArray().forEach(function(item){
        env[String(item.getKey())] = String(item.getValue());
    });

    return env;
};

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
Process.prototype.stdin = require('./process/stdin.js');
Process.prototype.env = getEnv();

// Setup statics
Process.prototype.argv = [];
Process.prototype.execPath = String(
    JavaSystem.getProperty('java.home') + '/bin/java'
);
Process.prototype.execArgv = [];

Process.prototype.version = '0.10.30';
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
 * Internal exiting status.
 *
 * @internal
 */
Process.prototype._exiting = false;

/**
 * Ends the process with the specified code.
 * If omitted, exit uses the 'success' code 0.
 *
 * @see http://nodejs.org/api/process.html#process_process_exit_code
 */
Process.prototype.exit = function(code)
{
    if (!process._exiting) {
        process._exiting = true;
        process.emit('exit', code || 0);
    }

    JavaSystem.exit(code || 0);
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

/**
 * Max following nextTick() call's.
 *
 * @see http://nodejs.org/api/process.html#process_process_maxTickDepth
 */
Process.maxTickDepth = 1000;

/**
 * Dummy for umask. (Found no good way to implement this.)
 *
 * @see http://nodejs.org/api/process.html#process_process_umask
 */
Process.prototype.umask = function(mask)
{
    // DUMMY
    return 0777;
};


// TODO: Process.prototype.env need to implement
// TODO: Process.prototype.getgid()
// TODO: Process.prototype.setgid(id)
// TODO: Process.prototype.getuid()
// TODO: Process.prototype.setuid(id)
// TODO: Process.prototype.getgroups()
// TODO: Process.prototype.setgroups(groups)
// TODO: Process.prototype.initgroups(user, extra_group)

Process.prototype.pid = getPid();

// Get/Set the title is only with java impossible, so we fake it.
Process.prototype.title = '';

Process.prototype.maxTickDepth = 1000;

/**
 * Should run on the next tick but in the moment it's only a setTimeout
 * that is set to a timeout of 0.
 *
 * maxTickDepth should be used on the next version.
 *
 * @see http://nodejs.org/api/process.html#process_process_nextTick
 */
Process.prototype.nextTick = null;

Process.prototype._addTimerEvent = null;

/**
 * Number of seconds Node has been running.
 *
 * @see http://nodejs.org/api/process.html#process_process_uptime
 */
Process.prototype.uptime = function()
{
    return Math.round(
        Number(JavaManagementFactory.getRuntimeMXBean().getUptime()) / 1000
    );
};

/**
 * Returns the current high-resolution real time in a [seconds, nanoseconds]
 * tuple Array.
 *
 * @see http://nodejs.org/api/process.html#process_process_hrtime
 */
Process.prototype.hrtime = function()
{
    return [
        Process.prototype.uptime(),
        (
            Number(JavaManagementFactory.getRuntimeMXBean().getUptime()) % 1000
        ) * 1000
    ]
};

Process.prototype.kill = function(pid, signal)
{
    if(signal == undefined) {
        signal = 15;
    }
    signal = Number(signal);

    runtime = JavaRuntime.getRuntime();
    if (Process.prototype.platform === 'windows') {
        throw new Error('Not implemented in the moment.');
        // runtime.exec('taskkill ' + ...);
    } else {
        try {
            var process = runtime.exec('kill -' + signal + ' ' + pid);
        } catch(e) {
            throw new Error('kill ESRCH');
        }

        if (process.exitValue() !== 0) {
            throw new Error('kill ESRCH');
        }
    }

    return true;
}

Process.prototype.config = undefined;

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
Process.prototype._needImmediateCallback = false;

/**
 * Internal property for Immediate.
 *
 * @internal
 */
Process.prototype._immediateCallback = null;

/**
 * Internal property for count of active timers.
 *
 * @internal
 */
Process.prototype._timerCount = 0;

module.exports = new Process();
