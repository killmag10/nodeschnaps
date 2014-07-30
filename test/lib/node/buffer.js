var Buffer = require('buffer').Buffer;

QUnit.test( "buffer", function() {
    var Buffer = require('buffer').Buffer;

    QUnit.ok(
        Buffer instanceof Function,
        "Buffer is in instance of Function"
    );

    QUnit.ok(
        new Buffer(0) instanceof Object,
        "Test new Buffer(0)"
    );
    QUnit.ok(
        new Buffer(4) instanceof Object,
        "Test new Buffer(4)"
    );
    QUnit.ok(
        new Buffer('test') instanceof Object,
        "Test new Buffer('test')"
    );
    QUnit.ok(
        new Buffer(9 * 1024) instanceof Object,
        "Test new Buffer(9 * 1024)"
    );
});
