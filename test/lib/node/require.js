var semver = require('semver');

QUnit.test("require", function(assert) {
    assert.ok(
        require instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test("require.resolve", function(assert) {
    assert.ok(
        require.resolve instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test("require.cache", function(assert) {
    assert.ok(
        require.cache instanceof Object,
        "Should be an instance of Object."
    );
});

QUnit.test('require.paths', function(assert) {
    assert.throws(
        function() {
            testObj.doesNotThrow(
                function(){
                    require.paths;
                },
                'require.paths is removed. Use node_modules folders, or'
                + ' the NODE_PATH environment variable instead.'
            );
        },
        'Should throw an Error.'
    );
});

QUnit.test("require .json", function(assert) {
    require(process.env.TEST_RESOURCE_PATH + '/test_json'),

    assert.ok(
        "Should be loaded correctly."
    );
});
