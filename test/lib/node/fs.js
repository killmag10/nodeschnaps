var testfile = process.env.TEST_RESOURCE_PATH + '/text';
var testfile_write = process.env.TEST_TEMP_PATH + '/test.write';

var testfileContent = [
    "test",
    "123",
    "",
    "äöü%!",
    "",
    ""
].join("\n");

var fstatProperties = [
    'dev',
    'ino',
    'mode',
    'nlink',
    'uid',
    'gid',
    'rdev',
    'size',
    'blksize',
    'blocks',
    'atime',
    'mtime',
    'ctime'
]

QUnit.asyncTest( "fs.open", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').open instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').open(
        testfile,
        'r',
        function(err, data) {
            if (err) throw err;

            QUnit.ok(typeof data === 'number', "Should return a number.");
            start();
        }
    );
});

QUnit.test( "fs.openSync", function() {
    QUnit.ok(
        require('fs').openSync instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        typeof require('fs').openSync(
            testfile,
            'r'
        ) === 'number',
        "Should return a number."
    );
});

QUnit.asyncTest( "fs.stat", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').stat instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').stat(
        testfile,
        function(err, data) {
            if (err) throw err;

            QUnit.ok(
                typeof data === 'object',
                "Should return a object."
            );
            start();
        }
    );
});

QUnit.test( "fs.statSync", function() {
    QUnit.ok(
        require('fs').statSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').statSync(
        testfile
    )

    QUnit.ok(
        typeof data === 'object',
        "Should return a object."
    );

    fstatProperties.forEach(function(key) {
        QUnit.ok(
            data[key] !== undefined,
            key + ": should exists."
        );
    });
});

QUnit.test( "fs.fstatSync", function() {
    QUnit.ok(
        require('fs').fstat instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile,
        'r'
    )

    var result = require('fs').fstatSync(fd);

    fstatProperties.forEach(function(key) {
        QUnit.ok(
            result[key] !== undefined,
            key + ": should exists."
        );
    });

    QUnit.ok(
        typeof result.size === 'number',
        "size: should be a number."
    );

    require('fs').closeSync(fd);
});

QUnit.asyncTest( "fs.readFile", function() {
    expect( 3 );

    QUnit.ok(
        require('fs').readFile instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readFile(
        testfile,
        function(err, data) {
            if (err) throw err;

            QUnit.ok(data instanceof Buffer, "Content should be an instance of Buffer.");
            QUnit.ok(data.toString() === testfileContent, "Content should be correct.");
            start();
        }
    );
});

QUnit.test( "fs.readFileSync", function() {
    QUnit.ok(
        require('fs').readFileSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').readFileSync(testfile);
    QUnit.ok(data instanceof Buffer, "Content should be an instance of Buffer.");
    QUnit.ok(
        data.toString() === testfileContent,
        "Content should be correct."
    );
});


QUnit.asyncTest( "fs.close", function() {
    expect( 2 );

    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    QUnit.ok(
        require('fs').close instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').close(
        fd,
        function(err, data) {
            if (err) throw err;

            QUnit.ok(true, "Should call callback.");
            start();
        }
    );
});

QUnit.test( "fs.closeSync", function()
{
    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    QUnit.ok(
        require('fs').closeSync instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        require('fs').closeSync(fd) === undefined,
        "Should return nothing."
    );
});

QUnit.asyncTest( "fs.exists", function() {
    expect( 3 );

    QUnit.ok(
        require('fs').exists instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').exists(
        testfile,
        function(exists) {
            QUnit.ok(exists === true, "exists should be true.");
        }
    );

    require('fs').exists(
        testfile + '_false',
        function(exists) {
            QUnit.ok(exists === false, "exists should be false.");
            start();
        }
    );
});

QUnit.test( "fs.existsSync", function()
{
    QUnit.ok(
        require('fs').existsSync instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        require('fs').existsSync(testfile) === true,
        "Should return true."
    );

    QUnit.ok(
        require('fs').existsSync(testfile + '_false') === false,
        "Should return false."
    );
});
