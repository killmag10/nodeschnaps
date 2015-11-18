QUnit.test('assert', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj('1', 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj('', 'test assert');
        },
        'Should throw an Error.'
    );
});


QUnit.test('assert.fail', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.fail instanceof Function,
        'Should be an instance of Function.'
    );

    assert.throws(
        function() {
            testObj.fail('0', '1', 'test fail', '=');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.ok', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.ok instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.ok('1', 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.ok('', 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.equal', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.equal instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.equal('1', 1, 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.equal('', 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notEqual', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.notEqual instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.notEqual('', 1, 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.notEqual('1', 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.deepEqual', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.deepEqual instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.deepEqual(
            { 'test' : '1' },
            { 'test' : 1 },
            'test assert'
        ),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.deepEqual(
                { 'test' : '' },
                { 'test' : 1 },
                'test assert'
            );
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notDeepEqual', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.notDeepEqual instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.notDeepEqual(
            { 'test' : '' },
            { 'test' : 1 },
            'test assert'
        ),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.notDeepEqual(
                { 'test' : '1' },
                { 'test' : 1 },
                'test assert'
            );
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.strictEqual', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.strictEqual instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.strictEqual(1, 1, 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.strictEqual(1, '1', 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notStrictEqual', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.notStrictEqual instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.notStrictEqual(1, '1', 'test assert'),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.notStrictEqual(1, 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.throws', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.throws instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.throws(
            function(){
                throw new RangeError('test');
            },
            RangeError
        ),
        'Should be undefined with error class.'
    );

    assert.ok(
        undefined === testObj.throws(
            function(){
                throw new RangeError('test');
            },
            /^Range/
        ),
        'Should be undefined with regex.'
    );

    assert.ok(
        undefined === testObj.throws(
            function(){
                throw new Error('test');
            },function(err) {
                if (err instanceof Error) {
                    return true;
                }
            },
            'test assert'
        ),
        'Should be undefined with function.'
    );

    assert.throws(
        function() {
            testObj.throws(
                function(){
                    throw new Error('test');
                },
                RangeError
            );
        },
        'Should throw an Error with error class.'
    );

    assert.throws(
        function() {
            testObj.throws(
                function(){
                    // nothing
                },
                /^Range/
            );
        },
        'Should throw an Error with regex.'
    );

    assert.throws(
        function() {
            testObj.throws(
                function(){
                    // nothing
                },function(err) {
                    if (err instanceof Error) {
                        return true;
                    }
                },
                'test assert'
            );
        },
        'Should throw an Error with function.'
    );
});

QUnit.test('assert.doesNotThrow', function(assert) {
    var testObj = require('assert');

    assert.ok(
        testObj.doesNotThrow instanceof Function,
        'Should be an instance of Function.'
    );

    assert.ok(
        undefined === testObj.doesNotThrow(
            function(){
                // nothing
            },
            'test assert'
        ),
        'Should be undefined.'
    );

    assert.throws(
        function() {
            testObj.doesNotThrow(
                function(){
                    throw new Error('test');
                },
                'test assert'
            );
        },
        'Should throw an Error.'
    );

});
