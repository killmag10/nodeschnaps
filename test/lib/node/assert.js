QUnit.test('assert', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj('1', 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj('', 'test assert');
        },
        'Should throw an Error.'
    );
});


QUnit.test('assert.fail', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.fail instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.throws(
        function() {
            testObj.fail('0', '1', 'test fail', '=');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.ok', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.ok instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.ok('1', 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.ok('', 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.equal', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.equal instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.equal('1', 1, 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.equal('', 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notEqual', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.notEqual instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.notEqual('', 1, 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.notEqual('1', 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.deepEqual', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.deepEqual instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.deepEqual(
            { 'test' : '1' },
            { 'test' : 1 },
            'test assert'
        ),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.deepEqual(
                { 'test' : '' },
                { 'test' : 1 },
                'test assert'
            )
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notDeepEqual', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.notDeepEqual instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.notDeepEqual(
            { 'test' : '' },
            { 'test' : 1 },
            'test assert'
        ),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.notDeepEqual(
                { 'test' : '1' },
                { 'test' : 1 },
                'test assert'
            )
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.strictEqual', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.strictEqual instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.strictEqual(1, 1, 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.strictEqual(1, '1', 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.notStrictEqual', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.notStrictEqual instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.notStrictEqual(1, '1', 'test assert'),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.notStrictEqual(1, 1, 'test assert');
        },
        'Should throw an Error.'
    );
});

QUnit.test('assert.throws', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.throws instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.throws(
            function(){
                throw new RangeError('test');
            },
            RangeError
        ),
        'Should be undefined with error class.'
    );

    QUnit.ok(
        undefined === testObj.throws(
            function(){
                throw new RangeError('test');
            },
            /^Range/
        ),
        'Should be undefined with regex.'
    );

    QUnit.ok(
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

    QUnit.throws(
        function() {
            testObj.throws(
                function(){
                    throw new Error('test');
                },
                RangeError
            )
        },
        'Should throw an Error with error class.'
    );

    QUnit.throws(
        function() {
            testObj.throws(
                function(){
                    // nothing
                },
                /^Range/
            )
        },
        'Should throw an Error with regex.'
    );

    QUnit.throws(
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
            )
        },
        'Should throw an Error with function.'
    );
});

QUnit.test('assert.doesNotThrow', function() {
    var testObj = require('assert');

    QUnit.ok(
        testObj.doesNotThrow instanceof Function,
        'Should be an instance of Function.'
    );

    QUnit.ok(
        undefined === testObj.doesNotThrow(
            function(){
                // nothing
            },
            'test assert'
        ),
        'Should be undefined.'
    );

    QUnit.throws(
        function() {
            testObj.doesNotThrow(
                function(){
                    throw new Error('test');
                },
                'test assert'
            )
        },
        'Should throw an Error.'
    );

});
