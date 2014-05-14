# nodeschnaps

Status: **IN DEVELOPMENT**

A NodeJS compatibility layer for Rhino.

## Features

### Implemented

* require(...) support
* NodeJS support:
  * Module loading:
    * JS Files
    * JSON Files
    * Packages
  * Core modules:
    * assert
    * console
    * events
    * module
    * util


### Planed to implement

* Timer Support
* NodeJS support:
  * Core modules:
    * buffer
    * child_process
    * cluster
    * constants
    * crypto
    * dgram
    * dns
    * domain
    * freelist
    * fs
    * http
    * https
    * module
    * net
    * os
    * path
    * punycode
    * querystring
    * readline
    * repl
    * stream
    * string_decoder
    * sys
    * timers
    * tls
    * tty
    * url
    * vm
    * zlib
  * Module loading:
    * Node Files (Binary)

## Supported Platforms

* Rhino JS

    ```js
    load('../loader.js');
    ```
* Pentaho Data-Integration (Kettle)
  * Load on Job (JavaScript):
  
    ```js
    ...
    ```
  * Load on Transformation (Modified Java Script Value):
  
    ```js
    LoadScriptFile(getEnvironmentVar('NODESCHNAPS_LOADER_FILE'));
    ```
    
## Inspiration

What is the Inspiration behind?

The main inspiration is to run ETL Transformation with the same code what we use
in NodeJS to save development time.
