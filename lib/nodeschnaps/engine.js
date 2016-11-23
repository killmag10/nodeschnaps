var Engine = {};

Engine.ids = {
    ENGINE_UNKNOWN: 0,
    ENGINE_RHINO: 1,
    ENGINE_NASHORN: 2
};

Engine.getEngineId = function() {
    if (global.engine === undefined) {
        return Engine.ids.ENGINE_RHINO;
    }

    var name = String(engine.getFactory().getEngineName()).toLowerCase();
    if (/nashorn/.test(name)) {
        return Engine.ids.ENGINE_NASHORN;
    }

    return Engine.ids.ENGINE_UNKNOWN;
};

Engine.is = function(engineId) {
    return Engine.getEngineId() === engineId;
};

module.exports = Engine;
