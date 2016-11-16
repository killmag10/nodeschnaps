QUnit.test( "async.call success", function(assert) {
    assert.expect( 4 );
    var done = assert.async();

    assert.ok(
        require('nodeschnaps/async.js').call instanceof Function,
        "Should be an instance of Function."
    );

    require('nodeschnaps/async.js').call(function() {
        assert.ok( true, "function should be called." );
        return 'test';
    },function(err,res) {
        assert.ok( err === null, "error should be null." );
        assert.ok( res === 'test', "result should be 'test'." );
        done();
    });
});

QUnit.test( "async.call error", function(assert) {
    assert.expect( 3 );
    var done = assert.async();

    require('nodeschnaps/async.js').call(function() {
        assert.ok( true, "function should be called." );
        throw new Error('test');
        return 'test';
    },function(err,res) {
        assert.ok( err instanceof Error, "error should be an instance of Error." );
        assert.ok( res === undefined, "result should be undefined." );
        done();
    });
});

QUnit.test( "async.call async-test", function(assert) {
    assert.expect( 3 );
    var done = assert.async();
    var called = false;

    require('nodeschnaps/async.js').call(function() {
        assert.ok( true, "function should be called." );
        return 'test';
    },function(err,res) {
        assert.ok( called === true, "called should be true" );
        if (err) {
            throw err;
        }
        done();
    });

    require('timers').setImmediate(function() {
        assert.ok( true, "should be called" );
        called = true;
    });
});
