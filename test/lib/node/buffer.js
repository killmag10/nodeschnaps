var Buffer = require('buffer').Buffer;

QUnit.test( "buffer", function(assert) {
    var Buffer = require('buffer').Buffer;

    assert.ok(
        Buffer instanceof Function,
        "Buffer is in instance of Function"
    );

    assert.ok(
        new Buffer(0) instanceof Object,
        "Test new Buffer(0)"
    );
    assert.ok(
        new Buffer(4) instanceof Object,
        "Test new Buffer(4)"
    );
    assert.ok(
        new Buffer('test') instanceof Object,
        "Test new Buffer('test')"
    );
    assert.ok(
        new Buffer(9 * 1024) instanceof Object,
        "Test new Buffer(9 * 1024)"
    );
});
