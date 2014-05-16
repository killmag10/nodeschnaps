var QUnit = require('qunitjs');
var colors = require('colors');

var tests = [
    'lib/nodeschnaps/node/process.js',
    'lib/nodeschnaps/node/console.js'
]

// Configure QUnit.
QUnit.init();
QUnit.config.blocking = true;
QUnit.config.autorun = false;
QUnit.config.updateRate = 0;

QUnit.moduleStart(function(details) {
    console.log(
        colors.bold("Test File: %s"),
        details.name
    )
});

QUnit.log(function(details) {
    var format = "    %s : [%s] %s";
    
    console.log(
        format,
        details.result ? 'OK    '.green : 'FAILED'.red,
        details.name,
        details.message.yellow
    );
});
QUnit.done(function(details) {
    var format = "\nTests Total: %s Failed: %s Passed: %s Runtime: %s ms\n";
    
    console.log(
        format,
        colors.bold(details.total),
        colors.bold(details.failed).red,
        colors.bold(details.passed).green,
        colors.bold(details.runtime).cyan
    );
});

// Start the tests.
console.log("Starting tests...\n");
tests.forEach(function(item){
    QUnit.module(item);
    require('./' + item);
});

QUnit.start();
