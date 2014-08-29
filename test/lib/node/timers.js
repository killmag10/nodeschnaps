QUnit.asyncTest( "timers.setTimeout", function() {
    expect( 3 );

    QUnit.ok(
        require('timers').setTimeout instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        setTimeout instanceof Function,
        "Should be global."
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

    QUnit.ok(
        clearTimeout instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setTimeout(function() {}, 60000);
    QUnit.ok(
        require('timers').clearTimeout(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.asyncTest( "timers.setInterval", function() {
    expect( 4 );

    QUnit.ok(
        require('timers').setInterval instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        setInterval instanceof Function,
        "Should be global."
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

    QUnit.ok(
        clearInterval instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setInterval(function() {}, 60000);
    QUnit.ok(
        require('timers').clearInterval(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.asyncTest( "timers.setImmediate", function() {
    expect( 12 );

    QUnit.ok(
        require('timers').setImmediate instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        setImmediate instanceof Function,
        "Should be global."
    );

    for (var i=1; i<10; i++){
        require('timers').setImmediate(function(i) {
            ok( true, i.toString() +"# immediate callback should be called." );
        },i);
    }
    require('timers').setImmediate(function() {
        ok( true, i.toString() + "# immediate callback should be called." );
        start();
    });
});

QUnit.test( "timers.clearImmediate", function() {
    QUnit.ok(
        require('timers').clearImmediate instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        clearImmediate instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setImmediate(function() {});
    QUnit.ok(
        require('timers').clearImmediate(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.test( "timers.ref/unref", function() {

    var timer = require('timers').setTimeout(function() {
        ok( true, "Timeout callback should be called." );
        start();
    }, 60000);

    QUnit.ok(
        timer.ref instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        timer.unref instanceof Function,
        "Should be an instance of Function."
    );

    QUnit.ok(
        timer.unref(timer) === undefined,
        "Should be undefined and throws no error."
    );

    QUnit.ok(
        timer.ref(timer) === undefined,
        "Should be undefined and throws no error."
    );

    QUnit.ok(
        require('timers').clearTimeout(timer) === undefined,
        "Should be undefined and throws no error."
    );
});
