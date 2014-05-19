var JavaFile = java.io.File;
var colors = require('colors');

/**
 * Manger to load and start tests.
 *
 * @constructor
 */
var Manager = function(baseDir)
{
    var testPaths = [];

    this.QUnit = require('qunitjs');

    // Configure QUnit.
    this.QUnit.init();
    this.QUnit.config.blocking = true;
    this.QUnit.config.autorun = false;
    this.QUnit.config.updateRate = 0;
    this.QUnit.config.testTimeout = 5000;

    this.QUnit.moduleStart(function(details) {
        console.log(
            colors.bold("Test File: %s"),
            details.name
        )
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
    });

    var getFiles = function getFiles(file)
    {
        var result = [];

        if (file.isDirectory()) {
            var fileList = file.listFiles();
            fileList.forEach(function(item){
                result = result.concat(getFiles(item));
            });
        } else {
            result.push(
                String(
                    file.getCanonicalPath()
                ).substr(baseDir.length +1)
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
            getFiles(new JavaFile(baseDir + '/' + path)).filter(function(item){
                return (item.search(/\.js$/) > -1)
            })
        );
    };

    /**
     * Start testing.
     */
    this.startTests = function()
    {
        console.log("Start tests...\n");

        testPaths.forEach(function(item){
            this.QUnit.module(item);
            require(baseDir + '/' +item);
        });

        this.QUnit.start();
    };
}

module.exports = Manager;
