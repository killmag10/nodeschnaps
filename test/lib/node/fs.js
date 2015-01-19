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

// fs.rename
QUnit.asyncTest( "fs.rename", function() {
    expect( 2 );

    require('fs').writeFileSync(testfile_write, 'test unlink');

    QUnit.ok(
        require('fs').rename instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').rename(
        testfile_write,
        testfile_write + '.renamed',
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write + '.renamed');
            start();
        }
    );
});

QUnit.test( "fs.renameSync", function() {
    require('fs').writeFileSync(testfile_write, 'test unlink');

    QUnit.ok(
        require('fs').renameSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').renameSync(
        testfile_write, testfile_write + '.renamed'
    );
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write + '.renamed');
});

// fs.ftruncate
QUnit.asyncTest( "fs.ftruncate", function() {
    expect( 2 );
    require('fs').writeFileSync(testfile_write, 'test truncate');

    QUnit.ok(
        require('fs').ftruncate instanceof Function,
        "Should be an instance of Function."
    );

    var file = require('fs').openSync(testfile_write, 'w');

    require('fs').ftruncate(
        file,
        0,
        function(err) {
            require('fs').closeSync(file);

            if (err) throw err;

            QUnit.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);
            start();
        }
    );
});

QUnit.test( "fs.ftruncateSync", function() {
    require('fs').writeFileSync(testfile_write, 'test truncate');

    QUnit.ok(
        require('fs').ftruncateSync instanceof Function,
        "Should be an instance of Function."
    );

    var file = require('fs').openSync(testfile_write, 'w');
    try {
        var data = require('fs').ftruncateSync(file, 0);
        QUnit.ok(
            data === undefined,
            "Should return nothing."
        );
    } finally {
        require('fs').closeSync(file);
    }

    require('fs').unlinkSync(testfile_write);
});


// fs.truncate
QUnit.asyncTest( "fs.truncate", function() {
    expect( 2 );
    require('fs').writeFileSync(testfile_write, 'test truncate');

    QUnit.ok(
        require('fs').truncate instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').truncate(
        testfile_write,
        0,
        function(err) {
            if (err) throw err;

            QUnit.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);
            start();
        }
    );
});

QUnit.test( "fs.truncateSync", function() {
    require('fs').writeFileSync(testfile_write, 'test truncate');

    QUnit.ok(
        require('fs').truncateSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').truncateSync(testfile_write, 0);
    QUnit.ok(
        data === undefined,
        "Should return nothing."
    );

    require('fs').unlinkSync(testfile_write);
});

// fs.stat
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

// fs.lstat
QUnit.asyncTest( "fs.lstat", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').lstat instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').lstat(
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

QUnit.test( "fs.lstatSync", function() {
    QUnit.ok(
        require('fs').statSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').lstatSync(
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

// fs.fstat
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

QUnit.test( "fs.fstatSync", function() {
    require('fs').writeFileSync(testfile_write, 'test fstatSync');

    QUnit.ok(
        require('fs').fstatSync instanceof Function,
        "Should be an instance of Function."
    );

    var file = require('fs').openSync(testfile_write, 'w');
    try {
        var data = require('fs').fstatSync(file);
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
    } finally {
        require('fs').closeSync(file);
    }

    require('fs').unlinkSync(testfile_write);
});

// fs.link
QUnit.asyncTest( "fs.link", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').link instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').link(
        testfile,
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            start();
        }
    );
});

QUnit.test( "fs.linkSync", function() {
    QUnit.ok(
        require('fs').symlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').linkSync(
        testfile,
        testfile_write
    );
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});


// fs.symlink
QUnit.asyncTest( "fs.symlink", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').symlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').symlink(
        testfile_write + '.linkdest',
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            start();
        }
    );
});

QUnit.test( "fs.symlinkSync", function() {
    QUnit.ok(
        require('fs').symlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').symlinkSync(
        testfile_write + '.linkdest',
        testfile_write
    );
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});

// fs.readlink
QUnit.asyncTest( "fs.readlink", function() {
    expect( 2 );

    var result = require('fs').symlinkSync(
        testfile,
        testfile_write
    );

    QUnit.ok(
        require('fs').readlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readlink(
        testfile_write,
        function(err, data) {
            if (err) throw err;

            QUnit.ok(typeof data === 'string', "linkString should be a string.");

            require('fs').unlinkSync(testfile_write);
            start();
        }
    );
});

QUnit.test( "fs.readlinkSync", function() {
    var result = require('fs').symlinkSync(
        testfile,
        testfile_write
    );

    QUnit.ok(
        require('fs').readlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').readlinkSync(testfile_write);
    QUnit.ok(typeof data === 'string', "linkString should be a string.");

    require('fs').unlinkSync(testfile_write);
});

// fs.realpath
QUnit.asyncTest( "fs.realpath", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').realpath instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').realpath(
        'lib/node/fs.js',
        function(err, data) {
            if (err) throw err;

            QUnit.ok(typeof data === 'string', "linkString should be a string.");
            start();
        }
    );
});

QUnit.test( "fs.realpathSync", function() {
    QUnit.ok(
        require('fs').realpathSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').realpathSync('lib/node/fs.js');
    QUnit.ok(typeof data === 'string', "linkString should be a string.");
});

// fs.unlink
QUnit.asyncTest( "fs.unlink", function() {
    expect( 2 );

    require('fs').writeFileSync(testfile_write, 'test unlink');

    QUnit.ok(
        require('fs').unlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').unlink(
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            start();
        }
    );
});

QUnit.test( "fs.unlinkSync", function() {
    require('fs').writeFileSync(testfile_write, 'test unlink');

    QUnit.ok(
        require('fs').unlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').unlinkSync(testfile_write);
    QUnit.ok(result === undefined, "Should return nothing.");
});

// fs.rmdir
QUnit.asyncTest( "fs.rmdir", function() {
    expect( 2 );

    require('fs').mkdirSync(testfile_write);

    QUnit.ok(
        require('fs').rmdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').rmdir(
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            start();
        }
    );
});

QUnit.test( "fs.rmdirSync", function() {
    require('fs').mkdirSync(testfile_write);

    QUnit.ok(
        require('fs').rmdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').rmdirSync(testfile_write);
    QUnit.ok(result === undefined, "Should return nothing.");
});

// fs.mkdir
QUnit.asyncTest( "fs.mkdir", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').mkdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').mkdir(
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            require('fs').rmdirSync(testfile_write);

            start();
        }
    );
});

QUnit.test( "fs.mkdirSync", function() {
    QUnit.ok(
        require('fs').mkdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').mkdirSync(testfile_write);
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').rmdirSync(testfile_write);
});

// fs.readdir
QUnit.asyncTest( "fs.readdir", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').readdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readdir(
        process.cwd(),
        function(err, files) {
            if (err) throw err;

            QUnit.ok(
                files instanceof Array,
                "files should be a Array"
            );
            start();
        }
    );
});

QUnit.test( "fs.readdirSync", function() {
    QUnit.ok(
        require('fs').readdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').readdirSync(process.cwd());
    QUnit.ok(result instanceof Array, "Should return a Array.");
});

// fs.close
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

// fs.open
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

// fs.utimes
// fs.futimes

// fs.fsync

QUnit.test( "fs.fsyncSync", function() {
    QUnit.ok(
        require('fs').fstat instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile,
        'r'
    )

    var result = require('fs').fsyncSync(fd);
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').closeSync(fd);
});

// fs.read && fs.readFile

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

// fs.write && fs.writeFile
QUnit.asyncTest( "fs.writeFile", function() {
    expect( 2 );

    QUnit.ok(
        require('fs').writeFile instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').writeFile(
        testfile_write,
        function(err) {
            if (err) throw err;

            QUnit.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            start();
        }
    );
});

QUnit.test( "fs.writeFileSync", function() {
    QUnit.ok(
        require('fs').writeFileSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').writeFileSync(testfile_write, '123\nabc');
    QUnit.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});

// fs.appendFile
// fs.watchFile
// fs.unwatchFile
// fs.watch

// fs.exists
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



