QUnit.test( "argv", function() {
    QUnit.ok(
        process.argv instanceof Number,
        "Should be an instanceOf Array."
    );
});
