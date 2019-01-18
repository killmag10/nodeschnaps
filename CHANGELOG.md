# Version 0.11.0
* 88a65b8 [core] add os binding
* ee853f4 [deps] Upgrade to Rhino 1.7.9 (https://github.com/mozilla/rhino/releases/tag/Rhino1_7_9_Release)

# Version 0.10.0
* 4e4dbaf [deps] Upgrade to Rhino 1.7.8 (https://github.com/mozilla/rhino/releases/tag/Rhino1_7_8_Release)

# Version 0.9.1
* 669d554 [bug] Downgrade to node module buffer@4 for start issue.

# Version 0.9.0
* dc73f76 [deps] Update npm dependencies.
* 8d26d31 [deps] Upgrade to Rhino 1.7.7.2 (https://github.com/mozilla/rhino/releases/tag/Rhino1_7_7_2_Release)

# Version 0.8.0
* 1f46fb4 [core] Add support for Nashorn Javascript.
* 57b8925 [core] Add support for Nashorn Javascript.
* 6ac7f78 [core] Add support for Nashorn Javascript.
* c065a31 [core] Add support for Nashorn Javascript.
* ec7737a [core] Add support for Nashorn Javascript.
* b9e989e [core] Improve support for Nashorn JavaScript.
* 41a5c0d [improvement][docs] Update README.md.
* 0c543e6 [improvement][testing] Support skipped tests.
* cd16abd [testing][bug] Run only testRhino on travis (Nashorn need java 8).
* ee1f608 [testing][enhancement] Include nashorn testing in test target.
* 2fd1cdf [testing][enhancement] Update travis configuration for nashorn testing.

# Version 0.7.0
* 1ca2689 [bug][core] Fix readed size of -1 in fs binding.
* cf9ccdb [bug][docs] Fix travis build status.
* a221dcd [bug][docs] Fix #13 - Cannot find module '/nodeschnaps/node.js'
* b1825fe [bug][testing] Fix testing exit status.
* a93e5f9 [core][deps] Update to nodejs 0.12.18.
* 64ac4f5 [deps] Update npm dependencies.
* ef6213a [deps] Update npm dev dependencies.
* 13166ad [improvement][deps] Upgrade to NodeJS 0.12.17.
* facbeec [testing] Use openjdk-7-jdk for travis.

# Version 0.6.1
* f14e5ff [core] Fix #11. Correct module loading for npm 3.

# Version 0.6.0
* 0c9cbc8 [core][deps] Update to nodejs 0.12.9.
* 7848296 [deps] Upgrade to Rhino 1.7.7.1 (https://github.com/mozilla/rhino/releases/tag/Rhino1_7_7_1_RELEASE)
* 1808ab1 [setup] Add NODESCHNAPS_DEPPENDENCY_NODE_DIST_URL to support downloads from other sources.
* 8516453 [testing] Update to qunitjs 1.20.

# Version 0.5.3
* [core][fs] Correct binary data reading and writing in fs binding.
* [core] Remove useless java sync block in async call.
* [config] Add coding style config.

# Version 0.5.2
* 787d27f [core][deps] Update to nodejs 0.12.7.

# Version 0.5.1
* 847b7c3 [core][fs] Fix fs binding for better support of java 6.
* 77e1bba [docs] Add shields to readme.
* 0f80ca7 [setup] add .travis.yml

# Version 0.5.0
* 78085ee [core][crypto] Add partial node crypto support.
* 8a02e73 [core][deps] Update to nodejs 0.12.4.
* f67fdd9 [core] Update to nodejs 0.12.2.
* a41e3ac [core][zlib] Add partial node zlib support.
* e799df7 [deps] Upgrade to Rhino 1.7.6 (https://github.com/mozilla/rhino/releases/tag/Rhino1_7_6_RELEASE)
* 0978251 [setup][docs] Add jsdoc.
* e03f9da [setup] Remove timer debug mode.

# Version 0.4.1
* 87db1f0 [core][fs] Fix IndexOutOfBoundsException on write on BSD

# Version 0.4.0
* 336b0a0 [#9][core][require] Fix json require bug.
* 0f1b705 [#2][core][fs] Update fs binding methods
* 7d3d6f8 [#2][core][fs] Update fs binding methods
* 71e4cf5 [#2][core][fs] Update fs binding methods
* e17cebe [deps][core] Update node to 0.10.35.
* cd69d33 [core] Add NODESCHNAPS_MODIFIER env var.
* 67cb3dc [#2][core][fs] Update fs binding methods
* ce65b30 [#2][core][fs] Update fs binding methods
* 37e22a9 [deps][core] Update node to 0.10.33.
* 3441cec [core][fs] Add first fs binding methods.

# Version 0.3.1
* aba66d2 [core][loader] Correct global, set really global.
* 3e8558f [testing] Add testing for nashorn.

# Version 0.3.0
* 2a197a6 [deps][core] Update node to 0.10.31.
* 9570f4e [core][timer] Correct timer functions.
* 4d21599 [core] Optimize main loop.
* 87fa024 [core] Implement process.env

# Version 0.2.0
* eecc505 [core] Update constants for node 0.10.30.
* 12761e2 [deps][core] Update node to 0.10.30 and correct bindings.
* 127381b [core] Implement "process.maxTickDepth".
* b9978db [core] Correct loader main module.
* 63d7022 [core] Add dummy for process umask and maxTickDepth.
* 2ed59f4 [core][main][error] Refactor main loop and error handling.
* add11e2 [Core][Timer] Fixed scope problem on timer run method and switched run of the timer callback on the main thread.

# Version 0.1.0
* First release.
