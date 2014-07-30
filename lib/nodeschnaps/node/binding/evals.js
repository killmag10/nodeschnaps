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
 * Creates a new NodeScript object for internal usage in NodeJS.
 *
 * @constructor
 * @param {String} The code.
 * @param {Object} A context.
 * @param {String} A name.
 */
vm.NodeScript = function(code, ctx, filename)
{
    this.runInThisContext = function()
    {
        return ctx._getContex().evaluateString(
            {},
            code,
            filename,
            0,
            null
        );
    };

    this.runInNewContext = function(sandbox)
    {
        if (sandbox === undefined) {
            sandbox = {};
        }
        
        return RhinoContext.getCurrentContext().evaluateString(
            sandbox,
            code,
            filename,
            0,
            null
        );
    };
};

vm.NodeScript.createContext = function(sandbox)
{
    var ctx = RhinoContext.getCurrentContext().getFactory().enterContext();
    
    return {
        "_getContex" : function() {
            return ctx;
        }
    };
};

vm.NodeScript.runInContext = function(code, context, filename)
{
    var script = new vm.NodeScript(
        code,
        context,
        filename
    );
    
    return script.runInThisContext();
};

vm.NodeScript.runInThisContext = function(code, filename)
{
    var script = new vm.NodeScript(
        code,
        vm.NodeScript.createContext(),
        filename
    );
    
    return script.runInThisContext();
};

vm.NodeScript.runInNewContext = function(code, sandbox, filename)
{
    var script = new vm.NodeScript(code, sandbox, filename);
    
    return script.runInNewContext();
};

module.exports = vm;

