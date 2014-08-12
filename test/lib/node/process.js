var semver = require('semver');

QUnit.test( "process", function() {
    QUnit.ok(
        process instanceof require('events').EventEmitter,
        "process should be an instance of EventEmitter."
    );
});


QUnit.test( "process.stdin", function() {
    [
        'read',
        'setEncoding',
        'resume',
        'pause',
        'pipe',
        'unpipe',
        'unshift',
        'wrap'
    ].forEach(function(key){
        QUnit.ok(
            process.stdin[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});


QUnit.test( "process.stdout", function() {
    [
        'write',
        'end'
    ].forEach(function(key){
        QUnit.ok(
            process.stdout[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});

QUnit.test( "process.stderr", function() {
    [
        'write',
        'end'
    ].forEach(function(key){
        QUnit.ok(
            process.stderr[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});

QUnit.test( "process.stdin", function() {
    QUnit.ok(
        process.stdin instanceof require('stream').Readable,
        "Should be an instance of stream.Readable."
    );
});

QUnit.test( "process.argv", function() {
    QUnit.ok(
        process.argv instanceof Array,
        "Should be an instance of Array."
    );
});

QUnit.test( "process.execPath", function() {
    QUnit.ok(
        typeof process.execPath === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.execArgv", function() {
    QUnit.ok(
        process.execArgv instanceof Array,
        "Should be an instance of Array."
    );
});

QUnit.test( "process.abort", function() {
    QUnit.ok(
        process.abort instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.chdir", function() {
    QUnit.ok(
        process.chdir instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.cwd", function() {
    QUnit.ok(
        process.cwd instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        typeof process.cwd() === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.env", function() {
    QUnit.ok(
        process.env instanceof Object,
        "Should be an instance of Object."
    );
});

QUnit.test( "process.exit", function() {
    QUnit.ok(
        process.exit instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.version", function() {
    QUnit.ok(
        typeof process.version === 'string',
        "Should be from type string."
    );

    QUnit.ok(
        semver.valid(process.version),
        "Should be an semver version number."
    );
});

QUnit.test( "process.versions", function() {
    QUnit.ok(
        process.versions instanceof Object,
        "Should be an instance of Object."
    );

    QUnit.ok(
        semver.valid(process.versions['node']),
        "node: Should be an semver version number."
    );
});

QUnit.test( "process.config", function() {
    QUnit.ok(
        'config' in process,
        "Property should be exists."
    );
});

QUnit.test( "process.kill", function() {
    QUnit.ok(
        process.kill instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.pid", function() {
    QUnit.ok(
        typeof process.pid === 'number',
        "Should be from type number."
    );
});

QUnit.test( "process.title", function() {
    QUnit.ok(
        typeof process.title === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.arch", function() {
    QUnit.ok(
        typeof process.arch === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.platform", function() {
    QUnit.ok(
        typeof process.arch === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.memoryUsage", function() {
    QUnit.ok(
        process.memoryUsage instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        typeof process.memoryUsage().rss === 'number',
        "rss: Should be from type number."
    );

    QUnit.ok(
        typeof process.memoryUsage().heapTotal === 'number',
        "heapTotal: Should be from type number."
    );

    QUnit.ok(
        typeof process.memoryUsage().heapUsed === 'number',
        "heapUsed: Should be from type number."
    );
});

QUnit.test( "process.nextTick", function() {
    QUnit.ok(
        process.nextTick instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.maxTickDepth", function() {
    QUnit.ok(
        typeof process.maxTickDepth === 'number',
        "Should be from type number."
    );
});

QUnit.test( "process.umask", function() {
    QUnit.ok(
        process.umask instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        typeof process.umask() === 'number',
        "umask(): Should be from type number."
    );
});

QUnit.test( "process.uptime", function() {
    QUnit.ok(
        process.uptime instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        typeof process.uptime() === 'number',
        "uptime(): Should be from type number."
    );
});

QUnit.test( "process.hrtime", function() {
    QUnit.ok(
        process.hrtime instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        process.hrtime() instanceof Array,
        "hrtime(): Should be an instance of Array."
    );

    QUnit.ok(
        process.hrtime().length === 2,
        "hrtime().length: Should be 2."
    );

    QUnit.ok(
        typeof process.hrtime()[0] === 'number',
        "hrtime().[0]: Should be from type number."
    );

    QUnit.ok(
        typeof process.hrtime()[1] === 'number',
        "hrtime().[1]: Should be from type number."
    );
});
