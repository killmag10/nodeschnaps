QUnit.test( "binding", function(assert) {
    assert.ok(
        process.binding instanceof Object,
        "Should be an instance of Object."
    );
});
