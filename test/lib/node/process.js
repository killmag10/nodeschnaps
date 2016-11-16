var semver = require('semver');

QUnit.test( "process", function(assert) {
    assert.ok(
        process instanceof require('events').EventEmitter,
        "process should be an instance of EventEmitter."
    );
});


QUnit.test( "process.stdin", function(assert) {
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
        assert.ok(
            process.stdin[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});


QUnit.test( "process.stdout", function(assert) {
    [
        'write',
        'end'
    ].forEach(function(key){
        assert.ok(
            process.stdout[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});

QUnit.test( "process.stderr", function(assert) {
    [
        'write',
        'end'
    ].forEach(function(key){
        assert.ok(
            process.stderr[key] instanceof Function,
            "Property " + key + " should be an instance of Function."
        );
    });
});

QUnit.test( "process.stdin", function(assert) {
    assert.ok(
        process.stdin instanceof require('stream').Readable,
        "Should be an instance of stream.Readable."
    );
});

QUnit.test( "process.argv", function(assert) {
    assert.ok(
        process.argv instanceof Array,
        "Should be an instance of Array."
    );
});

QUnit.test( "process.execPath", function(assert) {
    assert.ok(
        typeof process.execPath === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.execArgv", function(assert) {
    assert.ok(
        process.execArgv instanceof Array,
        "Should be an instance of Array."
    );
});

QUnit.test( "process.abort", function(assert) {
    assert.ok(
        process.abort instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.chdir", function(assert) {
    assert.ok(
        process.chdir instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.cwd", function(assert) {
    assert.ok(
        process.cwd instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        typeof process.cwd() === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.env", function(assert) {
    assert.ok(
        process.env instanceof Object,
        "Should be an instance of Object."
    );

    assert.ok(
        typeof process.env.TEST_VAR === 'string',
        "TEST_VAR should be from type string."
    );

    assert.ok(
        process.env.TEST_VAR === '123 test -',
        'TEST_VAR should be "123 test -".'
    );
});

QUnit.test( "process.exit", function(assert) {
    assert.ok(
        process.exit instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.version", function(assert) {
    assert.ok(
        typeof process.version === 'string',
        "Should be from type string."
    );

    assert.ok(
        semver.valid(process.version),
        "Should be an semver version number."
    );
});

QUnit.test( "process.versions", function(assert) {
    assert.ok(
        process.versions instanceof Object,
        "Should be an instance of Object."
    );

    assert.ok(
        semver.valid(process.versions['node']),
        "node: Should be an semver version number."
    );
});

QUnit.test( "process.config", function(assert) {
    assert.ok(
        'config' in process,
        "Property should be exists."
    );
});

QUnit.test( "process.kill", function(assert) {
    assert.ok(
        process.kill instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.pid", function(assert) {
    assert.ok(
        typeof process.pid === 'number',
        "Should be from type number."
    );
});

QUnit.test( "process.title", function(assert) {
    assert.ok(
        typeof process.title === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.arch", function(assert) {
    assert.ok(
        typeof process.arch === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.platform", function(assert) {
    assert.ok(
        typeof process.arch === 'string',
        "Should be from type string."
    );
});

QUnit.test( "process.memoryUsage", function(assert) {
    assert.ok(
        process.memoryUsage instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        typeof process.memoryUsage().rss === 'number',
        "rss: Should be from type number."
    );

    assert.ok(
        typeof process.memoryUsage().heapTotal === 'number',
        "heapTotal: Should be from type number."
    );

    assert.ok(
        typeof process.memoryUsage().heapUsed === 'number',
        "heapUsed: Should be from type number."
    );
});

QUnit.test( "process.nextTick", function(assert) {
    assert.ok(
        process.nextTick instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "process.umask", function(assert) {
    assert.ok(
        process.umask instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        typeof process.umask() === 'number',
        "umask(): Should be from type number."
    );
});

QUnit.test( "process.uptime", function(assert) {
    assert.ok(
        process.uptime instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        typeof process.uptime() === 'number',
        "uptime(): Should be from type number."
    );
});

QUnit.test( "process.hrtime", function(assert) {
    assert.ok(
        process.hrtime instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        process.hrtime() instanceof Array,
        "hrtime(): Should be an instance of Array."
    );

    assert.ok(
        process.hrtime().length === 2,
        "hrtime().length: Should be 2."
    );

    assert.ok(
        typeof process.hrtime()[0] === 'number',
        "hrtime().[0]: Should be from type number."
    );

    assert.ok(
        typeof process.hrtime()[1] === 'number',
        "hrtime().[1]: Should be from type number."
    );
});
