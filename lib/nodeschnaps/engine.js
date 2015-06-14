Engine = {}

Engine.ENGINE_UNKNOWN = 0;
Engine.ENGINE_RHINO = 1;
Engine.ENGINE_NASHORN = 2;

Engine.getEngineId = function()
{    
    if (global.engine === undefined) {
        return Engine.ENGINE_RHINO;
    }
    
    var name = String(engine.getFactory().getEngineName()).toLowerCase();
    if (/nashorn/.test(name)) {
        return Engine.ENGINE_NASHORN;
    }

    return Engine.ENGINE_UNKNOWN;
}

module.exports = Engine;
