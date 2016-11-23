/**
 * The vm module wrapper.
 *
 * @module nodeschnaps/lib/vm.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var RhinoContext = org.mozilla.javascript.Context;

var Engine = require('../../engine.js');
var scriptEngine = Engine.is(Engine.ids.ENGINE_NASHORN) ?
    new javax.script.ScriptEngineManager().getEngineByName('nashorn') : null;

/**
 * The vm object.
 */
var vm = {};

/**
 * Creates a new ContextifyScript object for internal usage in NodeJS.
 *
 * @constructor
 * @param {String} The code.
 * @param {Object} A context.
 * @param {String} A name.
 */
vm.ContextifyScript = function(code, options)
{
    code = String(code);
    if (undefined === options) options = {};

    this.runInThisContext = function()
    {
        return eval(code);
    };

    this.runInNewContext = function(scope)
    {
        if (scope === undefined) {
            scope = {};
        }

        if (scriptEngine) {
            return scriptEngine.eval(code, scope);
        }

        var context = RhinoContext.getCurrentContext().getFactory().enterContext();
        context.initStandardObjects();
        var result = context.evaluateString(
            scope,
            code,
            options.filename,
            0,
            null
        );
        context.exit();

        return result;
    };

    this.runInContext = function(sandbox)
    {
        var script = new vm.ContextifyScript(
            code,
            options
        );

        return script.runInNewContext(sandbox);
    };
};

vm.runInDebugContext = function(code)
{
    var script = new vm.ContextifyScript(code);
    return script.runInThisContext();
};

vm.makeContext = function(sandbox)
{
    return sandbox;
};

vm.isContext = function(sandbox)
{
    return sandbox instanceof Object;
};

module.exports = vm;
