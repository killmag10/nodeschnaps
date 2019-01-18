QUnit.test( "os.arch()", function(assert) {
    assert.ok(
        typeof require('os').arch() === 'string',
        'returns a string'
    );
});

QUnit.test( "os.cpus()", function(assert) {
    assert.ok(
        require('os').cpus() instanceof Array,
        'returns a Array'
    );
    assert.ok(
        require('os').cpus().length >= 1,
        'Array length >= 1'
    );
});

QUnit.test( "os.endianness()", function(assert) {
    assert.ok(
        ['BE', 'LE'].indexOf(require('os').endianness()) > -1,
        'returns BE or LE'
    );
});

QUnit.test( "os.freemem()", function(assert) {
    assert.ok(
        typeof require('os').freemem() === 'number',
        'returns a number'
    );
});

QUnit.test( "os.hostname()", function(assert) {
    assert.ok(
        typeof require('os').hostname() === 'string',
        'returns a string'
    );
});

QUnit.test( "os.hostname()", function(assert) {
    assert.ok(
        typeof require('os').hostname() === 'string',
        'returns a string'
    );
});

QUnit.test("os.loadavg()", function(assert) {
    assert.ok(
        require('os').loadavg() instanceof Array,
        'returns a Array'
    );
});

QUnit.test("os.networkInterfaces()", function(assert) {
    var networkInterfaces = require('os').networkInterfaces();
    assert.ok(
        networkInterfaces instanceof Object,
        'returns a Object'
    );
    assert.ok(
        networkInterfaces.lo instanceof Array,
        '.lo is a Array'
    );
});

QUnit.test("os.platform()", function(assert) {
    assert.ok(
        typeof require('os').platform() === 'string',
        'returns a string'
    );
});

QUnit.test("os.release()", function(assert) {
    assert.ok(
        typeof require('os').release() === 'string',
        'returns a string'
    );
});

QUnit.test("os.tmpdir()", function(assert) {
    assert.ok(
        typeof require('os').tmpdir() === 'string',
        'returns a string'
    );
});

QUnit.test( "os.totalmem()", function(assert) {
    assert.ok(
        typeof require('os').totalmem() === 'number',
        'returns a number'
    );
});

QUnit.test( "os.uptime()", function(assert) {
    assert.ok(
        typeof require('os').uptime() === 'number',
        'returns a number'
    );
});

QUnit.test("os.type()", function(assert) {
    assert.ok(
        typeof require('os').type() === 'string',
        'returns a string'
    );
});
