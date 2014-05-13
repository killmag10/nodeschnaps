var should = require('should');

tests = [
    'lib/nodeschnaps/node/process.js'
]

tests.forEach(function(item){
    var test = require('./' + item);
    test.test();
});
