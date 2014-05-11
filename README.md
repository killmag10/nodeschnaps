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
    * Modules

### Planed to implement

* Timer Support
* NodeJS support:
  * Core modules:
    * Buffer
    * Child Processes
    * Console
    * Crypto
    * DNS
    * Domain
    * Events
    * File System
    * Globals
    * HTTP
    * HTTPS
    * Net
    * OS
    * Path
    * Process
    * Punycode
    * Query Strings
    * Stream
    * String Decoder
    * Timers
    * TLS/SSL
    * TTY
    * UDP/Datagram
    * URL
    * Utilities
    * VM
    * ZLIB
  * Module loading:
    * Node Files (Binary)

## Supported Platforms

* Rhino JS

    ```js
    ...
    ```
* Pentaho Data-Integration (Kettle)
  * Load on Job (JavaScript):
  
    ```js
    ...
    ```
  * Load on Transformation (Modified Java Script Value):
    LoadScriptFile(getEnvironmentVar('NODESCHNAPS_LOADER_FILE'));
    
## Inspiration

What is the Inspiration behind?

The main inspiration is to run ETL Transformation with the same code what we use
in NodeJS to save development time.
