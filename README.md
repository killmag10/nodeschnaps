[![Nodeschnaps](https://raw.githubusercontent.com/killmag10/nodeschnaps/master/docs/assets/teaser.png)]()

Nodeschnaps is a [node.js](http://nodejs.org) compatibility layer for Java
Javscript engines like Rhino.
The main inspiration is to run ETL transformation with the same code we use
in node.js to save development time.

[![Travis](https://img.shields.io/travis/killmag10/nodeschnaps.svg)](https://travis-ci.org/killmag10/nodeschnaps)
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

Path to search for modules/files (Last must be the nodeschnaps lib folder).

##### NODESCHNAPS_MODIFIER

A path to a module, what will be loaded at the start to modify the environment.

#### Rhino JS

```js
load('../loader.js');

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
