// Include Java classes
var JavaThread = java.lang.Thread;

// Include Node objects
var assert = require('assert');
var util = require('util');

// Define variables 
var consoleTimeDates = {};

// Create module
var console = {};
console.log = function()
{
    process.stdout.write(
        util.format.apply(this,arguments) + "\n"
    );
};
console.info = console.log;
console.error = function()
{
    process.stderr.write(
        util.format.apply(this,arguments) + "\n"
    );
};
console.warn = console.error
console.dir = function(obj)
{
    process.stdout.write(
        util.inspect(obj) + "\n"
    );
};
console.time = function(label)
{
    consoleTimeDates[label] = new Date();
};
console.timeEnd = function(label)
{
    if (consoleTimeDates[label] === undefined) {
        throw new Error('No such label:' + label);
    }
    
    console.log(
        label + ': '
        + (new Date().getTime() - consoleTimeDates[label].getTime()) + 'ms'
    );
};
console.trace = function(label)
{
    var output = ['Trace: ' + label];
    var stack = JavaThread.currentThread().getStackTrace();
    stack.shift();
    stack.forEach(function(item){
        output.push('    at ' + String(item.toString()));
    });
    
    process.stdout.write(output.join("\n") + "\n");
};
console.assert = assert.ok;

module.exports = console;
