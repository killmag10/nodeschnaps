QUnit.asyncTest( "async.call success", function() {
    expect( 4 );

    QUnit.ok(
        require('nodeschnaps/async.js').call instanceof Function,
        "Should be an instance of Function."
    );

    require('nodeschnaps/async.js').call(function() {
        ok( true, "function should be called." );
        return 'test';
    },function(err,res) {
        ok( err === null, "error should be null." );
        ok( res === 'test', "result should be 'test'." );
        start();
    });
});

QUnit.asyncTest( "async.call error", function() {
    expect( 3 );

    require('nodeschnaps/async.js').call(function() {
        ok( true, "function should be called." );
        throw new Error('test');
        return 'test';
    },function(err,res) {
        ok( err instanceof Error, "error should be an instance of Error." );
        ok( res === undefined, "result should be undefined." );
        start();
    });
});

QUnit.asyncTest( "async.call async-test", function() {
    expect( 3 );
    var called = false;

    require('nodeschnaps/async.js').call(function() {
        ok( true, "function should be called." );
        return 'test';
    },function(err,res) {
        ok( called === true, "called should be true" );
        if (err) {
            throw err;
        }
        start();
    });

    require('timers').setImmediate(function() {
        ok( true, "should be called" );
        called = true;
    })
});
