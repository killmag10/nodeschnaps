QUnit.test( "argv", function() {
    QUnit.ok(
        process.argv instanceof Array,
        "Should be an instanceOf Array."
    );
});

QUnit.test( "version", function() {
    QUnit.ok(
        typeof process.version === 'string',
        "Should be the type string."
    );
});
