# Implementation status

We work hard to implement the full API of node.js. This document
describes the current status of our implementation.

## Done

* require(...) support
* Timer Support
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
    * crypto (partial over [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify))
    * events (nodejs only)
    * module
    * path (nodejs only)
    * process
    * punycode (nodejs only)
    * stream (nodejs only)
    * timers
    * util (nodejs only)
    * vm

## Work in progress

We are on in an early development phase where we write
tests, write concepts, and do a initial boostrap of the project.

## Todo

* NodeJS support:
  * Core modules:
    * child_process
    * cluster
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
    * string_decoder
    * sys
    * tls
    * tty
    * url
    * zlib
  * Module loading:
    * Node Files (Binary)

