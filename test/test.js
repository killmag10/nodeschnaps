var TestManager = require('./test/manager.js');

// Create test manager
var testManager = new TestManager(__dirname);
testManager.addPathRecursive('lib');
testManager.startTests();

NodeJS();
