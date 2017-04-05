"use strict"

var Engine = {};

Engine.ids = {
    ENGINE_UNKNOWN: 0,
    ENGINE_RHINO: 1,
    ENGINE_NASHORN: 2,
    ENGINE_V8: 3
};

var cache = {
    engineId: undefined
};

var getEngineId = function() {
    if (process.versions.v8) {
        return Engine.ids.ENGINE_V8;
    }

    if (global.engine === undefined) {
        return Engine.ids.ENGINE_RHINO;
    }

    if (global.engine) {
        var name = String(global.engine.getFactory().getEngineName()).toLowerCase();
        if (/nashorn/.test(name)) {
            return Engine.ids.ENGINE_NASHORN;
        }
    }

    return Engine.ids.ENGINE_UNKNOWN;
};

Engine.getEngineId = function() {
    if (cache.engineId !== undefined) {
        return cache.engineId;
    }

    return cache.engineId = getEngineId();
};

Engine.is = function(engineId) {
    return Engine.getEngineId() === engineId;
};

module.exports = Engine;
