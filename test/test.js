var should = require('should');

tests = [
    'lib/nodeschnaps/node/process.js',
    'lib/nodeschnaps/node/console.js'
]

tests.forEach(function(item){
    console.log('##### TEST: ' + item);
    var test = require('./' + item);
    test.test();
});
