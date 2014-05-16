QUnit.test( "stdout", function() {
    QUnit.ok(
        process.stdout instanceof Object,
        "Should be an instance of Object."
    );
});

QUnit.test( "stderr", function() {
    QUnit.ok(
        process.stderr instanceof Object,
        "Should be an instance of Object."
    );
});


QUnit.test( "argv", function() {
    QUnit.ok(
        process.argv instanceof Array,
        "Should be an instance of Array."
    );
});

QUnit.test( "version", function() {
    QUnit.ok(
        typeof process.version === 'string',
        "Should be from type string."
    );
});
