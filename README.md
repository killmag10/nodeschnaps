[![Nodeschnaps](https://raw.githubusercontent.com/killmag10/nodeschnaps/master/docs/assets/teaser.png)]()

Nodeschnaps is a [node.js](http://nodejs.org) compatibility layer for Rhino.
The main inspiration is to run ETL transformation with the same code we use
in node.js to save development time.

## Features

We work hard to implement the full API of node.js. So you could load
Nodeschnaps into your Rhino environment and use your node.js code without
restrictions. Take a look at the current
[development status](https://github.com/killmag10/nodeschnaps/blob/master/docs/status.md)
to get a overview of what we done so far.

## Supported Platforms

We plan to support the following platform:

* Rhino JS
* Pentaho Data-Integration (Kettle)
* Nashorn (later)

### Bootstrap

#### Installation

```sh
npm install nodeschnaps
```

#### Testing

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

#### Environment Variables

##### NODESCHNAPS_PATH

Path to search for modules/files (Last must be the nodeschnaps lib folder).

##### NODESCHNAPS_MODIFIER

A path to a module, what will be loaded at the start to modify the environment.

#### Rhino JS

```js
load('../loader.js');

NodeJS(...);
```

#### Pentaho Data-Integration (Kettle)

Load on Job (JavaScript):

```js
new Function(
    org.apache.commons.io.FileUtils.readFileToString(
      new java.io.File(parent_job.getVariable('NODESCHNAPS_LOADER_FILE'))
    )
)();

NodeJS(...);
```

Load on Transformation (Modified Java Script Value):

```js
LoadScriptFile(getEnvironmentVar('NODESCHNAPS_LOADER_FILE'));

NodeJS(...);
```

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
