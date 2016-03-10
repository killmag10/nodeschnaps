// Define global
global = this;

(function()
{
    // Include Java Classes
    var JavaSystem = java.lang.System;
    var JavaFile = java.io.File;
    var JavaFileInputStream = java.io.FileInputStream;
    var JavaReflectArray = java.lang.reflect.Array;
    var JavaByteTYPE = java.lang.Byte.TYPE;
    var JavaString = java.lang.String;

    // Constants
    const NODE_MODULE_DIRNAME = 'node_modules';
    const LOADER_MODULE_NAME = 'nodeschnaps';

    var getFileContent = function(filename)
    {
        var file = new JavaFile(filename);
        var buffer = JavaReflectArray.newInstance(JavaByteTYPE, file.length());
        try {
            var inputStream = new JavaFileInputStream(file);
            inputStream.read(buffer);
        } finally {
            inputStream.close();
        }

        return String(new JavaString(buffer));
    };

    // Classes
    var RequireConfig = new (function()
    {
        this.fileSeparator = '/';
        this.paths = String(
            JavaSystem.getProperty('NODESCHNAPS_PATH')
        ).split(':');
        this.paths.push(
            this.paths[this.paths.length - 1] + '/../' + NODE_MODULE_DIRNAME
        );
    })();

    var RequireCache = new (function()
    {
        var self = this;
        this.cache = {};

        this.set = function(filename, module)
        {
            self.cache[filename] = module;
        };

        this.get = function(filename)
        {
            return self.cache[filename];
        };
    })();

    var RequireResolver = function(currentModule)
    {
        var self = this;

        var getCurrentDir = function()
        {
            return String(new JavaFile(currentModule.filename).getParent());
        }

        var resolvePackage = function(searchObject)
        {
            var filename = searchObject.filename;
            var packageFile = filename + RequireConfig.fileSeparator
                + 'package.json';
            var jsFile = filename + RequireConfig.fileSeparator + 'index.js';

            var javaFile = new JavaFile(packageFile);
            if(javaFile.exists()) {
                var package = JSON.parse(getFileContent(packageFile));

                if (
                    self.resolve.browser
                    && package.browser
                    && typeof package.browser.valueOf() === 'string'
                ) {
                    searchObject.filename = filename
                        + RequireConfig.fileSeparator + package.browser;
                    searchObject.paths.unshift(
                        String(new JavaFile(filename).getCanonicalPath())
                            + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                    );

                    return resolveType(searchObject);
                }

                if (package.main) {
                    searchObject.filename = filename
                        + RequireConfig.fileSeparator + package.main;
                    searchObject.paths.unshift(
                        String(new JavaFile(filename).getCanonicalPath())
                            + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                    );

                    return resolveType(searchObject);
                }
            }

            var javaFile = new JavaFile(jsFile);
            if(javaFile.exists()) {
                searchObject.paths.unshift(
                        String(new JavaFile(filename).getCanonicalPath())
                            + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                );
                return {
                    "filename" : String(javaFile.getCanonicalPath()),
                    "paths" : searchObject.paths
                };
            }

            return null;
        };

        var resolveType = function(searchObject)
        {
            var filename = searchObject.filename;

            var javaFile = new JavaFile(filename + '.js');
            if (javaFile.exists() && !javaFile.isDirectory()) {
                filename = String(javaFile.getCanonicalPath());
                searchObject.paths.unshift(
                    String(new JavaFile(filename).getParent())
                        + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                );
                return {
                    "filename" : filename,
                    "paths" : searchObject.paths
                }
            }

            var javaFile = new JavaFile(filename + '.json');
            if (javaFile.exists() && !javaFile.isDirectory()) {
                filename = String(javaFile.getCanonicalPath());
                searchObject.paths.unshift(
                    String(new JavaFile(filename).getParent())
                        + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                );
                return {
                    "filename" : filename,
                    "paths" : searchObject.paths
                }
            }

            var javaFile = new JavaFile(filename + '.node');
            if (javaFile.exists() && !javaFile.isDirectory()) {
                throw new Error(
                    'File extension .node not supported at the moment. File: "'
                        + String(javaFile.getCanonicalPath())
                );
            }

            var javaFile = new JavaFile(filename);
            if (javaFile.exists() && !javaFile.isDirectory()) {
                filename = String(javaFile.getCanonicalPath());
                searchObject.paths.unshift(
                    String(new JavaFile(filename).getParent())
                        + RequireConfig.fileSeparator + NODE_MODULE_DIRNAME
                );
                return {
                    "filename" : filename,
                    "paths" : searchObject.paths
                }
            }

            var javaFile = new JavaFile(filename);
            if (javaFile.exists() && javaFile.isDirectory()){
                return resolvePackage(searchObject);
            }

            return null;
        };

        var resolveByRelativePath = function(searchObject)
        {
            searchObject.filename =
                getCurrentDir() + RequireConfig.fileSeparator
                    + searchObject.filename;

            return resolveType(searchObject);
        };

        var resolveByIncludePath = function(searchObject)
        {
            var filename = searchObject.filename;
            var paths = searchObject.paths;

            for (var key in paths) {
                searchObject.filename =
                    paths[key] + RequireConfig.fileSeparator
                        + filename;
                searchObject.paths = paths.concat();

                var resolvedObject = resolveType(searchObject);
                if (resolvedObject !== null) {
                    return resolvedObject;
                }
            }

            return null;
        };

        var resolve = function(searchObject)
        {
            // if absolute path
            if (
                searchObject.filename
                    .indexOf(RequireConfig.fileSeparator) === 0
            ) {
                return resolveType(searchObject);
            }

            // if relative path
            if (
                searchObject.filename
                    .indexOf('.' + RequireConfig.fileSeparator) === 0
                || searchObject.filename
                    .indexOf('..' + RequireConfig.fileSeparator) === 0
            ) {
                return resolveByRelativePath(searchObject);
            }

            // load from inlcude paths
            return resolveByIncludePath(searchObject);
        };

        this.resolveModule = function(filename)
        {
            var resolvedObject = resolve({
                "filename" : filename,
                "paths" : currentModule.paths.concat()
            });
            if(resolvedObject === null) {
                throw new Error(
                    "Cannot find module '" + filename + "'"
                );
            }

            return resolvedObject;
        };

        this.resolve = function(filename)
        {
            return self.resolveModule(filename).filename;
        };

        if (currentModule.require) {
            this.resolve.browser = currentModule.require.resolve.browser;
        } else {
            this.resolve.browser = false
        }
    };

    var RequireMain = null;
    RequireMain = function(currentModule)
    {
        var self = this;

        var generateModule = function(currentModule, filename)
        {
            return {
                "id" : filename,
                "filename" : filename,
                "loaded" : false,
                "parent" : currentModule ? currentModule : undefined,
                "children" : [],
                "exports" : {},
                "paths" : [],
                "require" : currentModule.require
            }
        };

        var requireJs = function(resolvedObject)
        {
            var module = generateModule(currentModule, resolvedObject.filename);
            module.paths = resolvedObject.paths.concat();
            RequireCache.set(resolvedObject.filename, module);
            currentModule.children.push(module);
            var sandbox = new Function(
                'module, exports, require, __filename, __dirname',
                getFileContent(resolvedObject.filename)
            );
            module.require = new RequireMain(module).require;
            sandbox(
                module,
                module.exports,
                module.require,
                resolvedObject.filename,
                String(new JavaFile(resolvedObject.filename).getParent())
            );
            module.loaded = true;

            return module;
        };

        var requireJson = function(resolvedObject)
        {
            var module = generateModule(currentModule, resolvedObject.filename);
            RequireCache.set(resolvedObject.filename, module);
            module.exports = JSON.parse(getFileContent(
                resolvedObject.filename
            ));
            module.loaded = true;
            module.require = currentModule.require;

            return module;
        };

        this.require = function(filename)
        {
            var resolvedObject = self.resolver.resolveModule(filename);

            // if is cached
            if(RequireCache.get(resolvedObject.filename) !== undefined) {
                return RequireCache.get(resolvedObject.filename).exports;
            }

            var module = null;
            // .js
            if (resolvedObject.filename.search(/\.(js)$/i) >= 0){
                module = requireJs(resolvedObject);
            }
            // .json
            if (resolvedObject.filename.search(/\.(json)$/i) >= 0){
                module = requireJson(resolvedObject);
            }
            // .node
            if (resolvedObject.filename.search(/\.(node)$/i) >= 0){
                throw new Error(
                    'File extension .node not supported at the moment. File: "'
                        + resolvedObject.filename
                );
            }

            if (module !== null) {
                return module.exports;
            }

            throw new Error(
                'Unkown error on loading "' + resolvedObject.filename + '"'
            );
        };

        this.resolver = new RequireResolver(currentModule);
        this.require.resolve = this.resolver.resolve;

        // Throw a error than this.require.paths will be access.
        // Because require.paths war's removed in node.
        Object.defineProperty(
            this.require,
            "paths",
            {
                get : function() {
                    throw new Error(
                        'require.paths is removed. Use node_modules folders, or'
                        + ' the NODE_PATH environment variable instead.'
                    );
                }
            }
        );

        this.require.cache = RequireCache.cache;
    };

    global.module = {
            "id" : '.',
            "filename" : String(JavaFile('.').getCanonicalPath() + '/.'),
            "loaded" : true,
            "parent" : null,
            "children" : [],
            "exports" : {},
            "paths" : RequireConfig.paths.concat(),
            "require" : null
    };
    global.require = new RequireMain(global.module).require;
    global.module.require = global.require;
    global.__filename = global.module.filename;
    global.__dirname = String(
        new JavaFile(global.module.filename).getParentFile().getCanonicalPath()
    );

    require('nodeschnaps/node.js');
})()
