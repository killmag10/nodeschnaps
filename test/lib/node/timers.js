QUnit.test( "timers.setTimeout", function(assert) {
    assert.expect( 3 );
    var done = assert.async();

    assert.ok(
        require('timers').setTimeout instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        setTimeout instanceof Function,
        "Should be global."
    );

    require('timers').setTimeout(function() {
        assert.ok( true, "Timeout callback should be called." );
        done();
    }, 10);
});

QUnit.test( "timers.clearTimeout", function(assert) {
    assert.ok(
        require('timers').clearTimeout instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        clearTimeout instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setTimeout(function() {}, 60000);
    assert.ok(
        require('timers').clearTimeout(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.test( "timers.setInterval", function(assert) {
    assert.expect( 4 );
    var done = assert.async();

    assert.ok(
        require('timers').setInterval instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        setInterval instanceof Function,
        "Should be global."
    );

    var first = true;

    var timer = require('timers').setInterval(function() {
        assert.ok( true, "Interval callback should be called." );
        if (first !== true) {
            require('timers').clearInterval(timer);
            done();
        }
        first = false;
    }, 10);
});

QUnit.test( "timers.clearInterval", function(assert) {
    assert.ok(
        require('timers').clearInterval instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        clearInterval instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setInterval(function() {}, 60000);
    assert.ok(
        require('timers').clearInterval(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.test( "timers.setImmediate", function(assert) {
    assert.expect( 12 );
    var done = assert.async();

    assert.ok(
        require('timers').setImmediate instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        setImmediate instanceof Function,
        "Should be global."
    );

    for (var i=1; i<10; i++){
        require('timers').setImmediate(function(i) {
            assert.ok( true, i.toString() +"# immediate callback should be called." );
        },i);
    }
    require('timers').setImmediate(function() {
        assert.ok( true, i.toString() + "# immediate callback should be called." );
        done();
    });
});

QUnit.test( "timers.clearImmediate", function(assert) {
    assert.ok(
        require('timers').clearImmediate instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        clearImmediate instanceof Function,
        "Should be global."
    );

    var timer = require('timers').setImmediate(function() {});
    assert.ok(
        require('timers').clearImmediate(timer) === undefined,
        "Should be undefined and throws no error."
    );
});

QUnit.test( "timers.ref/unref", function(assert) {

    var timer = require('timers').setTimeout(function() {
        assert.assert.ok( true, "Timeout callback should be called." );
        done();
    }, 60000);

    assert.ok(
        timer.ref instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        timer.unref instanceof Function,
        "Should be an instance of Function."
    );

    assert.ok(
        timer.unref(timer) === undefined,
        "Should be undefined and throws no error."
    );

    assert.ok(
        timer.ref(timer) === undefined,
        "Should be undefined and throws no error."
    );

    assert.ok(
        require('timers').clearTimeout(timer) === undefined,
        "Should be undefined and throws no error."
    );
});
