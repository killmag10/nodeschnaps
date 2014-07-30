QUnit.test( "binding", function() {
    QUnit.ok(
        process.binding instanceof Object,
        "Should be an instance of Object."
    );
});
