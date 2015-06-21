QUnit.test( "zlib", function(assert) {
    var zlib = require('zlib');

    assert.ok(
        zlib instanceof Object,
        "zlib is in instance of Object"
    );   
});

QUnit.test( "zlib.deflateSync", function(assert) {
    var zlib = require('zlib');

    var result = zlib.deflateSync('test string 123');
    
    assert.strictEqual(
        result.toString('hex'),
        '789c2b492d2e51282e29cacc4b5730343206002e4a052e',
        'deflateSync result should be correct.'
    );

    assert.strictEqual(
        zlib.inflateSync(result).toString(),
        'test string 123',
        'inflate result should be correct.'
    );
});

QUnit.test( "zlib.gzipSync", function(assert) {
    var zlib = require('zlib');

    var result = zlib.gzipSync('test string 123');

    assert.strictEqual(
        result.toString('hex'),
        '1f8b08000000000000032b492d2e51282e29cacc4b5730343206006a9bde7b0f000000',
        'gzipSync result should be correct.'
    );

    assert.strictEqual(
        zlib.gunzipSync(result).toString(),
        'test string 123',
        'gunzipSync result should be correct.'
    );
});
