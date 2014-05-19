QUnit.asyncTest( "timers.setTimeout", function() {
    expect( 2 );

    QUnit.ok(
        require('timers').setTimeout instanceof Function,
        "Should be an instance of Function."
    );

    require('timers').setTimeout(function() {
        ok( true, "Timeout callback should be called." );
        start();
    }, 10);
});

QUnit.test( "timers.clearTimeout", function() {
    QUnit.ok(
        require('timers').clearTimeout instanceof Function,
        "Should be an instance of Function."
    );

    var timer = require('timers').setTimeout(function() {}, 60000);
    QUnit.ok(
        require('timers').clearTimeout(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.asyncTest( "timers.setInterval", function() {
    expect( 3 );

    QUnit.ok(
        require('timers').setInterval instanceof Function,
        "Should be an instance of Function."
    );

    var first = true;

    var timer = require('timers').setInterval(function() {
        ok( true, "Interval callback should be called." );
        if (first !== true) {
            require('timers').clearInterval(timer);
            start();
        }
        first = false;
    }, 10);
});

QUnit.test( "timers.clearInterval", function() {
    QUnit.ok(
        require('timers').clearInterval instanceof Function,
        "Should be an instance of Function."
    );

    var timer = require('timers').setInterval(function() {}, 60000);
    QUnit.ok(
        require('timers').clearInterval(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.asyncTest( "timers.setImmediate", function() {
    expect( 2 );

    QUnit.ok(
        require('timers').setImmediate instanceof Function,
        "Should be an instance of Function."
    );

    require('timers').setImmediate(function() {
        ok( true, "Timeout callback should be called." );
        start();
    });
});

QUnit.test( "timers.clearImmediate", function() {
    QUnit.ok(
        require('timers').clearImmediate instanceof Function,
        "Should be an instance of Function."
    );

    var timer = require('timers').setImmediate(function() {});
    QUnit.ok(
        require('timers').clearImmediate(timer) === undefined,
        "Should be undefined and throws no error."
    );
});
