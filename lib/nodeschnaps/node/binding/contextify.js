/**
 * The vm module wrapper.
 *
 * @module nodeschnaps/lib/vm.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var RhinoContext = org.mozilla.javascript.Context;
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
    if (undefined === options) options = {};

    this.runInThisContext = function()
    {
        return this.runInContext({});
    };

    this.runInNewContext = function(sandbox)
    {
        if (sandbox === undefined) {
            sandbox = {};
        }

        var context = RhinoContext.getCurrentContext().getFactory().enterContext();

        return context.evaluateString(
            sandbox,
            code,
            options.filename,
            0,
            null
        );
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
    return RhinoContext.getCurrentContext().initStandardObjects(sandbox);
};

vm.isContext = function(sandbox)
{
    return sandbox instanceof Object;
};

module.exports = vm;

