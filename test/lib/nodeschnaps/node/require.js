var semver = require('semver');

QUnit.test("require", function() {
    QUnit.ok(
        require instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test("require.resolve", function() {
    QUnit.ok(
        require.resolve instanceof Function,
        "Should be an instance of Function."
    );
});

QUnit.test("require.cache", function() {
    QUnit.ok(
        require.cache instanceof Object,
        "Should be an instance of Object."
    );
});

QUnit.test('require.paths', function() {
    QUnit.throws(
        function() {
            testObj.doesNotThrow(
                function(){
                    require.paths
                },
                'require.paths is removed. Use node_modules folders, or'
                + ' the NODE_PATH environment variable instead.'
            )
        },
        'Should throw an Error.'
    );
});
