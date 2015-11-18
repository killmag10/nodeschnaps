var TestManager = require('./test/manager.js');

// Create test manager
var testManager = new TestManager(__dirname);
var testFile = String(java.lang.System.getProperties().getProperty('TEST_FILE', ''));

if (testFile) {
    testManager.addPathRecursive(testFile);
} else {
    testManager.addPathRecursive('lib');
}
testManager.startTests();

NodeJS();
