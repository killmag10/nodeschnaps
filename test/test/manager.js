try {
    var JavaFile = java.io.File;
} catch(e)
{
}

var colors = require('colors');
colors.enabled = true;

/**
 * Manger to load and start tests.
 *
 * @constructor
 */
var Manager = function(baseDir)
{
    var testPaths = [];

    this.QUnit = require('qunitjs');
    global.QUnit = this.QUnit;

    // Configure QUnit.
    this.QUnit.config.blocking = true;
    this.QUnit.config.autostart = false;
    this.QUnit.config.testTimeout = 5000;

    this.QUnit.moduleStart(function(details) {
        console.log(
            colors.bold("Test File: %s"),
            details.name
        );
    });

    this.QUnit.log(function(details) {
        var format = "    %s : [%s] %s";

        console.log(
            format,
            details.result ? 'OK    '.green : 'FAILED'.red,
            details.name,
            details.message.yellow
        );
    });

    this.QUnit.done(function(details) {
        var format = "\nTests Total: %s Failed: %s Passed: %s Runtime: %s ms\n";

        console.log(
            format,
            colors.bold(details.total),
            colors.bold(details.failed).red,
            colors.bold(details.passed).green,
            colors.bold(details.runtime).cyan
        );

        if (details.failed > 0) {
            process.exit(1);
        };
    });

    var getFiles = function getFiles(file)
    {
        var result = [];

        var fs = require('fs');
        var file = fs.realpathSync(file);

        if (fs.statSync(file).isDirectory()) {
            var fileList = fs.readdirSync(file);
            fileList.forEach(function(item){
                result = result.concat(
                    getFiles(file + '/' + item)
                );
            });
        } else {
            result.push(
                file.substr(baseDir.length +1)
            );
        }

        return result;
    };

    /**
     * Add all .js files in path.
     *
     * @param {String} A path.
     */
    this.addPathRecursive = function(path)
    {
        testPaths = testPaths.concat(
            getFiles(baseDir + '/' + path).filter(function(item){
                return (item.search(/\.js$/) > -1);
            })
        );
    };

    /**
     * Start testing.
     */
    this.startTests = function(testFile)
    {
        var self = this;
        console.log("Start tests...\n");

        if (testFile) {
            require(testFile);
        }

        testPaths.forEach(function(item){
            self.QUnit.module(item);
            require(baseDir + '/' +item);
        });

        this.QUnit.load();
        this.QUnit.start();
    };
};

module.exports = Manager;
