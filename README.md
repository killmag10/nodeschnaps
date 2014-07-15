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

### Bootstrap

#### Rhino JS

```js
load('../loader.js');
```

#### Pentaho Data-Integration (Kettle)

Load on Job (JavaScript):

```js
new Function(
    org.apache.commons.io.FileUtils.readFileToString(
      new java.io.File(parent_job.getVariable("NODESCHNAPS_LOADER_FILE"))
    )
)();
```

Load on Transformation (Modified Java Script Value):

```js
LoadScriptFile(getEnvironmentVar('NODESCHNAPS_LOADER_FILE'));
```

