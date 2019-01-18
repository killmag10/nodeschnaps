[![Nodeschnaps](https://raw.githubusercontent.com/killmag10/nodeschnaps/master/docs/assets/teaser.png)]()

Nodeschnaps is a [node.js](http://nodejs.org) compatibility layer for Java
Javscript engines like Rhino.
The main inspiration is to run ETL transformation with the same code we use
in node.js to save development time.

[![Travis](https://img.shields.io/travis/killmag10/nodeschnaps/master.svg)](https://travis-ci.org/killmag10/nodeschnaps)
[![npm](https://img.shields.io/npm/dm/nodeschnaps.svg)](https://www.npmjs.com/package/nodeschnaps)
[![npm](https://img.shields.io/npm/v/nodeschnaps.svg)](https://www.npmjs.com/package/nodeschnaps)

## Features

We work hard to implement the full API of node.js. So you could load
Nodeschnaps into your Rhino environment and use your node.js code without
restrictions. Take a look at the current
[development status](https://github.com/killmag10/nodeschnaps/blob/master/docs/status.md)
to get a overview of what we done so far.

## Supported Platforms

* Rhino JS
    * Pentaho Data-Integration (Kettle)
* Nashorn
    * Pentaho Data-Integration (Kettle)

### Installation

```sh
npm install nodeschnaps
```

### Testing

Install dev dependencies:
```sh
npm install
```

Run tests with rhinojs:
```sh
make test
```

Run tests with nodejs:
```sh
make testNode
```

### Configuration

#### Environment Variables

##### NODESCHNAPS_PATH
*(required)*

Path to search for modules/files (Last must be the nodeschnaps lib folder).

One path of the variable **must** be set to the lib folder of nodeschnaps.
The path separator is like in the other path variables ":".

Nodeschnaps need to know his location to load his own modules.

The paths **should** be absolute to be independent from applications CWD like in the case of Kettle.

Example:
```
/home/you/project/node_modules:/home/you/project/node_modules/nodeschnaps/lib
```

##### NODESCHNAPS_MODIFIER
*(optional)*

A path to a module, what will be loaded at the start to modify the environment.

### Load nodeschnaps

To load nodeschnaps the environment variable *NODESCHNAPS_PATH* **must** be set.

**Optional** you can use for rhino the includet rhino jar in the deps/rhino/lib folder.

Example for rhino:
```sh
java \
    -cp ./node_modules/nodeschnaps/deps/rhino/lib/rhino-1.7.9.jar \
    -DNODESCHNAPS_PATH=/home/you/project/node_modules/nodeschnaps/lib \
    org.mozilla.javascript.tools.shell.Main \
    test.js
```

#### Rhino JS / Nashorn

```js
load('./node_modules/nodeschnaps/loader.js');

// Your code here ...

NodeJS();
```

#### Pentaho Data-Integration (Kettle)

##### Load on Transformation (Modified Java Script Value):

**Start Script**
```js
LoadScriptFile(getEnvironmentVar('NODESCHNAPS_LOADER_FILE'));

// Your code here ...

NodeJS();
```
**Transform Script**
```js

// Your code here ...

NodeJS();
```

**End Script**
```js
// Your code here ...

NodeJS();
```

##### Load on Job (JavaScript):

```js
new Function(
    org.apache.commons.io.FileUtils.readFileToString(
      new java.io.File(parent_job.getVariable('NODESCHNAPS_LOADER_FILE'))
    )
)();

// Your code here ...

NodeJS();
```

For a example look at: [kitchen-stove](https://github.com/killmag10/kitchen-stove)

### Start from Command-line

#### Rhino
```sh
java \
    -DNODESCHNAPS_PATH=./node_modules/nodeschnaps/lib \
    -cp ./node_modules/nodeschnaps/deps/rhino/lib/rhino-1.7.9.jar \
    org.mozilla.javascript.tools.shell.Main \
    YOUR.js
```

#### Nashorn
```sh
jjs \
    --language=es5 \
    -DNODESCHNAPS_PATH=./node_modules/nodeschnaps/lib \
    YOUR.js
```

### Coding

#### Start main loop
As callback:

```js
NodeJS(function(){
    // Your code here ...
});
```

Or before:

```js
// Your code here ...

NodeJS();
```
