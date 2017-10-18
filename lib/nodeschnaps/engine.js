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

    if (Java.type) {
        return Engine.ids.ENGINE_NASHORN;
    }

    if (global.engine === undefined) {
        return Engine.ids.ENGINE_RHINO;
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
