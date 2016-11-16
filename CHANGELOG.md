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
