# Implementation status

We work hard to implement the full API of node.js. This document
describes the current status of our implementation.

## Done

* require(...) support
* NodeJS support:
  * Module loading:
    * JS Files
    * JSON Files
    * Packages
  * Core modules:
    * assert (nodejs only)
    * buffer (over [buffer-browserify](https://github.com/toots/buffer-browserify))
    * console
    * constants
    * events (nodejs only)
    * module
    * path (nodejs only)
    * punycode (nodejs only)
    * timers
    * util (nodejs only)

## Work in progress

We are on in an early development phase where we write
tests, write concepts, and do a initial boostrap of the project.

## Todo

* Timer Support
* NodeJS support:
  * Core modules:
    * child_process
    * cluster
    * crypto
    * dgram
    * dns
    * domain
    * freelist
    * fs
    * http
    * https
    * net
    * os
    * querystring
    * readline
    * repl
    * stream
    * string_decoder
    * sys
    * tls
    * tty
    * url
    * vm
    * zlib
  * Module loading:
    * Node Files (Binary)

