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
];

// fs.rename
QUnit.test( "fs.rename", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    require('fs').writeFileSync(testfile_write, 'test unlink');

    assert.ok(
        require('fs').rename instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').rename(
        testfile_write,
        testfile_write + '.renamed',
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write + '.renamed');
            done();
        }
    );
});

QUnit.test( "fs.renameSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test unlink');

    assert.ok(
        require('fs').renameSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').renameSync(
        testfile_write, testfile_write + '.renamed'
    );
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write + '.renamed');
});

// fs.ftruncate
QUnit.test( "fs.ftruncate", function(assert) {
    assert.expect( 2 );
    var done = assert.async();
    require('fs').writeFileSync(testfile_write, 'test truncate');

    assert.ok(
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

            assert.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);
            done();
        }
    );
});

QUnit.test( "fs.ftruncateSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test truncate');

    assert.ok(
        require('fs').ftruncateSync instanceof Function,
        "Should be an instance of Function."
    );

    var file = require('fs').openSync(testfile_write, 'w');
    try {
        var data = require('fs').ftruncateSync(file, 0);
        assert.ok(
            data === undefined,
            "Should return nothing."
        );
    } finally {
        require('fs').closeSync(file);
    }

    require('fs').unlinkSync(testfile_write);
});


// fs.truncate
QUnit.test( "fs.truncate", function(assert) {
    assert.expect( 2 );
    var done = assert.async();
    require('fs').writeFileSync(testfile_write, 'test truncate');

    assert.ok(
        require('fs').truncate instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').truncate(
        testfile_write,
        0,
        function(err) {
            if (err) throw err;

            assert.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);
            done();
        }
    );
});

QUnit.test( "fs.truncateSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test truncate');

    assert.ok(
        require('fs').truncateSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').truncateSync(testfile_write, 0);
    assert.ok(
        data === undefined,
        "Should return nothing."
    );

    require('fs').unlinkSync(testfile_write);
});

// fs.stat
QUnit.test( "fs.stat", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').stat instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').stat(
        testfile,
        function(err, data) {
            if (err) throw err;

            assert.ok(
                typeof data === 'object',
                "Should return a object."
            );
            done();
        }
    );
});

QUnit.test( "fs.statSync", function(assert) {
    assert.ok(
        require('fs').statSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').statSync(
        testfile
    );

    assert.ok(
        typeof data === 'object',
        "Should return a object."
    );

    fstatProperties.forEach(function(key) {
        assert.ok(
            data[key] !== undefined,
            key + ": should exists."
        );
    });
});

// fs.lstat
QUnit.test( "fs.lstat", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').lstat instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').lstat(
        testfile,
        function(err, data) {
            if (err) throw err;

            assert.ok(
                typeof data === 'object',
                "Should return a object."
            );
            done();
        }
    );
});

QUnit.test( "fs.lstatSync", function(assert) {
    assert.ok(
        require('fs').statSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').lstatSync(
        testfile
    );

    assert.ok(
        typeof data === 'object',
        "Should return a object."
    );

    fstatProperties.forEach(function(key) {
        assert.ok(
            data[key] !== undefined,
            key + ": should exists."
        );
    });
});

// fs.fstat
QUnit.test( "fs.fstatSync", function(assert) {
    assert.ok(
        require('fs').fstat instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    var result = require('fs').fstatSync(fd);

    fstatProperties.forEach(function(key) {
        assert.ok(
            result[key] !== undefined,
            key + ": should exists."
        );
    });

    assert.ok(
        typeof result.size === 'number',
        "size: should be a number."
    );

    require('fs').closeSync(fd);
});

QUnit.test( "fs.fstatSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test fstatSync');

    assert.ok(
        require('fs').fstatSync instanceof Function,
        "Should be an instance of Function."
    );

    var file = require('fs').openSync(testfile_write, 'w');
    try {
        var data = require('fs').fstatSync(file);
        assert.ok(
            typeof data === 'object',
            "Should return a object."
        );

        fstatProperties.forEach(function(key) {
            assert.ok(
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
QUnit.test( "fs.link", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').link instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').link(
        testfile,
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            done();
        }
    );
});

QUnit.test( "fs.linkSync", function(assert) {
    assert.ok(
        require('fs').symlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').linkSync(
        testfile,
        testfile_write
    );
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});


// fs.symlink
QUnit.test( "fs.symlink", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').symlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').symlink(
        testfile_write + '.linkdest',
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            done();
        }
    );
});

QUnit.test( "fs.symlinkSync", function(assert) {
    assert.ok(
        require('fs').symlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').symlinkSync(
        testfile_write + '.linkdest',
        testfile_write
    );
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});

// fs.readlink
QUnit.test( "fs.readlink", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    var result = require('fs').symlinkSync(
        testfile,
        testfile_write
    );

    assert.ok(
        require('fs').readlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readlink(
        testfile_write,
        function(err, data) {
            if (err) throw err;

            assert.ok(typeof data === 'string', "linkString should be a string.");

            require('fs').unlinkSync(testfile_write);
            done();
        }
    );
});

QUnit.test( "fs.readlinkSync", function(assert) {
    var result = require('fs').symlinkSync(
        testfile,
        testfile_write
    );

    assert.ok(
        require('fs').readlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').readlinkSync(testfile_write);
    assert.ok(typeof data === 'string', "linkString should be a string.");

    require('fs').unlinkSync(testfile_write);
});

// fs.realpath
QUnit.test( "fs.realpath", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').realpath instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').realpath(
        'lib/node/fs.js',
        function(err, data) {
            if (err) throw err;

            assert.ok(typeof data === 'string', "linkString should be a string.");
            done();
        }
    );
});

QUnit.test( "fs.realpathSync", function(assert) {
    assert.ok(
        require('fs').realpathSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').realpathSync('lib/node/fs.js');
    assert.ok(typeof data === 'string', "linkString should be a string.");
});

// fs.unlink
QUnit.test( "fs.unlink", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    require('fs').writeFileSync(testfile_write, 'test unlink');

    assert.ok(
        require('fs').unlink instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').unlink(
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            done();
        }
    );
});

QUnit.test( "fs.unlinkSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test unlink');

    assert.ok(
        require('fs').unlinkSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').unlinkSync(testfile_write);
    assert.ok(result === undefined, "Should return nothing.");
});

// fs.rmdir
QUnit.test( "fs.rmdir", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    require('fs').mkdirSync(testfile_write);

    assert.ok(
        require('fs').rmdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').rmdir(
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            done();
        }
    );
});

QUnit.test( "fs.rmdirSync", function(assert) {
    require('fs').mkdirSync(testfile_write);

    assert.ok(
        require('fs').rmdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').rmdirSync(testfile_write);
    assert.ok(result === undefined, "Should return nothing.");
});

// fs.mkdir
QUnit.test( "fs.mkdir", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').mkdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').mkdir(
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            require('fs').rmdirSync(testfile_write);

            done();
        }
    );
});

QUnit.test( "fs.mkdirSync", function(assert) {
    assert.ok(
        require('fs').mkdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').mkdirSync(testfile_write);
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').rmdirSync(testfile_write);
});

// fs.readdir
QUnit.test( "fs.readdir", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').readdir instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readdir(
        process.cwd(),
        function(err, files) {
            if (err) throw err;

            assert.ok(
                files instanceof Array,
                "files should be a Array"
            );
            done();
        }
    );
});

QUnit.test( "fs.readdirSync", function(assert) {
    assert.ok(
        require('fs').readdirSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').readdirSync(process.cwd());
    assert.ok(result instanceof Array, "Should return a Array.");
});

// fs.close
QUnit.test( "fs.close", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    assert.ok(
        require('fs').close instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').close(
        fd,
        function(err, data) {
            if (err) throw err;

            assert.ok(true, "Should call callback.");
            done();
        }
    );
});

QUnit.test( "fs.closeSync", function(assert)
{
    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    assert.ok(
        require('fs').closeSync instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        require('fs').closeSync(fd) === undefined,
        "Should return nothing."
    );
});

// fs.open
QUnit.test( "fs.open", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').open instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').open(
        testfile,
        'r',
        function(err, data) {
            if (err) throw err;

            assert.ok(typeof data === 'number', "Should return a number.");
            done();
        }
    );
});

QUnit.test( "fs.openSync", function(assert) {
    assert.ok(
        require('fs').openSync instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        typeof require('fs').openSync(
            testfile,
            'r'
        ) === 'number',
        "Should return a number."
    );
});

// fs.utimes
QUnit.test( "fs.utimes", function(assert) {
    assert.expect( 2 );
    var done = assert.async();
    require('fs').writeFileSync(testfile_write, 'test utimes');

    assert.ok(
        require('fs').utimes instanceof Function,
        "Should be an instance of Function."
    );

    var time = new Date();

    require('fs').utimes(
        testfile_write,
        time,
        time,
        function(err) {
            if (err) throw err;

            assert.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);
            done();
        }
    );
});

QUnit.test( "fs.utimesSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test utimes');

    assert.ok(
        require('fs').utimesSync instanceof Function,
        "Should be an instance of Function."
    );

    var time = new Date();
    var data = require('fs').utimesSync(testfile_write, time, time);
    assert.ok(
        data === undefined,
        "Should return nothing."
    );

    require('fs').unlinkSync(testfile_write);
});


// fs.futimes
QUnit.test( "fs.futimes", function(assert) {
    assert.expect( 2 );
    var done = assert.async();
    require('fs').writeFileSync(testfile_write, 'test futimes');

    assert.ok(
        require('fs').futimes instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile_write,
        'w'
    );

    var time = new Date();

    require('fs').futimes(
        fd,
        time,
        time,
        function(err) {
            if (err) throw err;

            assert.ok(true, "Should call callback.");
            require('fs').unlinkSync(testfile_write);

            require('fs').closeSync(fd);
            done();
        }
    );
});

QUnit.test( "fs.futimesSync", function(assert) {
    require('fs').writeFileSync(testfile_write, 'test futimes');

    assert.ok(
        require('fs').futimesSync instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile_write,
        'w'
    );

    var time = new Date();
    var data = require('fs').futimesSync(fd, time, time);
    assert.ok(
        data === undefined,
        "Should return nothing."
    );

    require('fs').closeSync(fd);
    require('fs').unlinkSync(testfile_write);
});

// fs.fsync

QUnit.test( "fs.fsyncSync", function(assert) {
    assert.ok(
        require('fs').fstat instanceof Function,
        "Should be an instance of Function."
    );

    var fd = require('fs').openSync(
        testfile,
        'r'
    );

    var result = require('fs').fsyncSync(fd);
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').closeSync(fd);
});

// fs.read && fs.readFile

QUnit.test( "fs.readFile", function(assert) {
    assert.expect( 3 );
    var done = assert.async();

    assert.ok(
        require('fs').readFile instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').readFile(
        testfile,
        function(err, data) {
            if (err) throw err;

            assert.ok(data instanceof Buffer, "Content should be an instance of Buffer.");
            assert.ok(data.toString() === testfileContent, "Content should be correct.");
            done();
        }
    );
});

QUnit.test( "fs.readFileSync", function(assert) {
    assert.ok(
        require('fs').readFileSync instanceof Function,
        "Should be an instance of Function."
    );

    var data = require('fs').readFileSync(testfile);
    assert.ok(data instanceof Buffer, "Content should be an instance of Buffer.");
    assert.ok(
        data.toString() === testfileContent,
        "Content should be correct."
    );
});

// fs.write && fs.writeFile
QUnit.test( "fs.writeFile", function(assert) {
    assert.expect( 2 );
    var done = assert.async();

    assert.ok(
        require('fs').writeFile instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').writeFile(
        testfile_write,
        function(err) {
            if (err) throw err;

            assert.ok(
                true,
                "Callback should be called."
            );

            require('fs').unlinkSync(testfile_write);

            done();
        }
    );
});

QUnit.test( "fs.writeFileSync", function(assert) {
    assert.ok(
        require('fs').writeFileSync instanceof Function,
        "Should be an instance of Function."
    );

    var result = require('fs').writeFileSync(testfile_write, '123\nabc');
    assert.ok(result === undefined, "Should return nothing.");

    require('fs').unlinkSync(testfile_write);
});

// fs.appendFile
// fs.watchFile
// fs.unwatchFile
// fs.watch

// fs.exists
QUnit.test( "fs.exists", function(assert) {
    assert.expect( 3 );
    var done = assert.async(2);

    assert.ok(
        require('fs').exists instanceof Function,
        "Should be an instance of Function."
    );

    require('fs').exists(
        testfile,
        function(exists) {
            assert.ok(exists === true, "exists should be true.");
            done();
        }
    );

    require('fs').exists(
        testfile + '_false',
        function(exists) {
            assert.ok(exists === false, "exists should be false.");
            done();
        }
    );
});

QUnit.test( "fs.existsSync", function(assert)
{
    assert.ok(
        require('fs').existsSync instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        require('fs').existsSync(testfile) === true,
        "Should return true."
    );

    assert.ok(
        require('fs').existsSync(testfile + '_false') === false,
        "Should return false."
    );
});


QUnit.test( "fs ", function(assert) {
    var testfile = process.env.TEST_RESOURCE_PATH + '/tux.png';
    var testfile_write = process.env.TEST_TEMP_PATH + '/tux.write.png';

    var fs = require('fs');
    var data = fs.readFileSync(testfile);
    fs.writeFileSync(testfile_write, data);

    assert.ok(
        data instanceof Buffer,
        "data should be a Buffer"
    );

    require('fs').unlinkSync(testfile_write);
});
