/**
 * Main Class.
 *
 * @module nodeschnaps/lib/main.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaThread = java.lang.Thread;
var JavaThreadState = java.lang.Thread.State;
var JavaTimer = java.util.Timer;
var JavaTimerTask = java.util.TimerTask;

/**
 * The main class.
 *
 * @constructor
 */
var Main = function Main()
{
    var self = this;
    var mainThread = JavaThread.currentThread();
    var nextTickQueue = [];
    var timerEvents = [];
    var currentTickDepth = 0;

    var handleUncaughtException = function(e)
    {
        if (process.listeners('uncaughtException').length === 0) {
            console.error(
                e.toString() + '\n' + e.stack.toString()
            );
            process.exit(1);
        }

        process.emit('uncaughtException', e);
    };

    process.nextTick = function nextTick(callback)
    {
        if (process._exiting) {
            return;
        }

        nextTickQueue.push({
            callback: callback,
            domain: process.domain ? process.domain : null,
            tickDepth: currentTickDepth
        });
    }

    process._addTimerEvent = function _addTimerEvent(callback)
    {
        timerEvents.push({
            callback: callback,
            domain: process.domain ? process.domain : null
        });
    }

    this.init = function init()
    {
        var javaTimer = new JavaTimer();
        var timerTaskPrototype = {
            run: function() {
                self.runMain();
                javaTimer.cancel();
            }
        };
        var timerTask = new JavaAdapter(JavaTimerTask, timerTaskPrototype);

        javaTimer.schedule(timerTask,0);
    }

    this.runMain = function runMain(callback)
    {
        try {
            callback && callback();

            while(true) {
                try {
                    if (self.processNextTick()) {
                        continue;
                    }
                    if (self.processImmediate()) {
                        continue;
                    }
                    if (self.processTimer()) {
                        continue;
                    }
                } catch (e) {
                    handleUncaughtException(e);
                    continue;
                }

                if (!self.tasksExists()) {
                    // Exit main loop if no task exists.
                    break;
                }

                JavaThread.sleep(0, 50);
            }
        } catch (e) {
            handleUncaughtException(e);
        }
    }

    this.immediateTasksExists = function immediateTasksExists()
    {
        if (true === process._needImmediateCallback) {
            return true;
        }

        return false;
    }

    this.nextTickTasksExists = function nextTickTasksExists()
    {
        if (0 < nextTickQueue.length) {
            return true;
        }

        return false;
    }

    this.timerEventsExists = function timerEventsExists()
    {
        if (0 < timerEvents.length) {
            return true;
        }

        return false;
    }

    this.tasksExists = function tasksExists()
    {
        if (this.nextTickTasksExists()) {
            return true;
        }

        if (this.immediateTasksExists()) {
            return true;
        }

        if (this.timerEventsExists()) {
            return true;
        }

        // if not running only the main timer.
        if (0 < process._timerCount) {
            return true;
        }

        return false;
    }

    this.processNextTick = function processNextTick()
    {
        if (0 < nextTickQueue.length) {
            var obj = nextTickQueue.shift();
            currentTickDepth=obj.tickDepth
            currentTickDepth++;
            try {
                if (currentTickDepth > process.maxTickDepth) {
                    throw new Error(
                        'Recursive process.nextTick detected. ' +
                        'Max deep of process.maxTickDepth reached.'
                    );
                }
                obj.callback();

                return true;
            } finally {
                currentTickDepth--;
            }
        }

        return false;
    }

    this.processImmediate = function processImmediate()
    {
        if (process._immediateCallback instanceof Function) {
            // Callback war's set, so we call it.
            if (true === process._needImmediateCallback) {
                process._immediateCallback();
                return true;
            }
        }

        return false;
    }

    this.processTimer = function processTimer()
    {
        if (0 < timerEvents.length) {
            var obj = timerEvents.shift();
            obj.callback();
            return true;
        }

        return false;
    }
};

module.exports = Main;

