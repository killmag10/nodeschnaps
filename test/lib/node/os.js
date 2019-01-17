QUnit.test( "os.endianness()", function(assert) {
    assert.ok(
        ['BE', 'LE'].indexOf(require('os').endianness()) > -1,
        'returns BE or LE'
    );
});

QUnit.test( "os.hostname()", function(assert) {
    assert.ok(
        typeof require('os').hostname() === 'string',
        'returns a string'
    );
});

QUnit.test("os.type()", function(assert) {
    assert.ok(
        typeof require('os').type() === 'string',
        'returns a string'
    );
});

QUnit.test("os.release()", function(assert) {
    assert.ok(
        typeof require('os').release() === 'string',
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
