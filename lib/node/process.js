var JavaSystem = java.lang.System;

var process = {};
var util = require('util');
var events = require('events');

var Process = function() {
    events.EventEmitter.call(this);
};
util.inherits(Process, events.EventEmitter);

Process.prototype.stdout = {};
Process.prototype.stdout.write = function(data)
{
    JavaSystem.out.print(data);
};
Process.prototype.stderr = {};
Process.prototype.stderr.write = function(data)
{
    JavaSystem.err.print(data);
};
// TODO: Process.prototype.stdin need to implement
Process.prototype.argv = [];
Process.prototype.execPath = null;
Process.prototype.abort = function()
{
    process.exit(1);
};
Process.prototype.chdir = function(directory)
{
    JavaSystem.setProperty('user.dir', directory);
};
Process.prototype.cwd = function()
{
    return String(JavaSystem.getProperty('user.dir'));
};
// TODO: Process.prototype.env need to implement
Process.prototype.exit = function(code)
{    
    JavaSystem.exit(
        code === undefined ? 0 : code
    );
};
// TODO: Process.prototype.getgid()
// TODO: Process.prototype.setgid(id)
// TODO: Process.prototype.getuid()
// TODO: Process.prototype.setuid(id)
// TODO: Process.prototype.getgroups()
// TODO: Process.prototype.setgroups(groups)
// TODO: Process.prototype.initgroups(user, extra_group)
Process.prototype.version = '0.10.28';
Process.prototype.versions = {
  node: Process.prototype.version,
  modules: '11'
}
// IGNORED: Process.prototype.config
// TODO: Process.prototype.kill(pid, [signal])
Process.prototype.exit = function(code)
{    
    JavaSystem.exit(
        code === undefined ? 0 : code
    );
};
// TODO: Process.prototype.pid
// TODO: Process.prototype.title
Process.prototype.arch =
    String(JavaSystem.getProperty('os.arch').toLowerCase());
Process.prototype.platform =
    String(JavaSystem.getProperty('os.name').toLowerCase());
Process.prototype.memoryUsage = function()
{
    var runtime = java.lang.Runtime.getRuntime();
    
    return {
        "rss" : Number(runtime.maxMemory()),
        "heapTotal" : Number(runtime.totalMemory()),
        "heapUsed" : Number(runtime.totalMemory() - runtime.freeMemory())
    }
};
// TODO: Process.prototype.nextTick(callback)
// TODO: Process.prototype.maxTickDepth
// TODO: Process.prototype.umask([mask])
// TODO: Process.prototype.process.uptime()
// TODO: Process.prototype.process.hrtime()

// Events
// TODO: Event: 'exit'
// TODO: Event: 'uncaughtException'

// Internal Methods
Process.prototype.binding = function(name)
{
    return require(LOADER_MODULE_NAME + '/lib/node/binding/' + name);
};
Process.prototype.noDeprecation = false;
Process.prototype.traceDeprecation = false;

module.exports = new Process();
