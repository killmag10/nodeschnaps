var JavaFile = java.io.File;
var TestManager = require('./test/manager.js');

// Get the test files.
var baseDir =
    String(new JavaFile(module.filename).getParentFile().getCanonicalPath());

// Create test manager
var testManager = new TestManager(baseDir);
testManager.addPathRecursive('lib');
testManager.startTests();
