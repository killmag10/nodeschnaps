var JavaFile = java.io.File;

var path = new JavaFile(module.filename).getParentFile().getParentFile();
var buffer = null;
while (path !== null && buffer === null) {
    try {
        buffer = require(path.toString() + '/node_modules/buffer');
    } catch(e) {
        // Ignore error.
    }
    path = path.getParentFile();
}

module.exports = buffer;
