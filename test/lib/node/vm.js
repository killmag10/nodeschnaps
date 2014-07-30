QUnit.test( "vm.runInThisContext", function() {
    QUnit.ok(
        require('vm').runInThisContext instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "vm.runInNewContext", function() {
    QUnit.ok(
        require('vm').runInNewContext instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "vm.runInContext", function() {
    QUnit.ok(
        require('vm').runInContext instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "vm.createContext", function() {
    QUnit.ok(
        require('vm').createContext instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test( "vm.createScript", function() {
    QUnit.ok(
        require('vm').createScript instanceof Function,
        "Should be an instance of Function."
    );
});
