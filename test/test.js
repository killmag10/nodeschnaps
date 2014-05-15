var QUnit = require('qunitjs');


var tests = [
    'lib/nodeschnaps/node/process.js',
    //'lib/nodeschnaps/node/console.js'
]

QUnit.init();
QUnit.config.blocking = false;
QUnit.config.autorun = true;
QUnit.config.updateRate = 0;
QUnit.log(function(details) {
    console.log(
        "Test: %s\n    [%s] : %s %s",
        details.module,
        details.name,
        details.result,
        details.message
    );
});

// Start the tests.
console.log('Starting tests...');
tests.forEach(function(item){
    QUnit.module(item);
    require('./' + item);
});
