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
var Main = function()
{
    var self = this;
    var mainThread = JavaThread.currentThread();
    var nextTickQueue = [];
    var timerEvents = [];

    process.nextTick = function(callback)
    {
        if (process._exiting) {
            return;
        }

        nextTickQueue.push({
            callback: callback,
            domain: process.domain ? process.domain : null
        });
    }

    process._addTimerEvent = function (callback)
    {
        timerEvents.push({
            callback: callback,
            domain: process.domain ? process.domain : null
        });
    }

    this.init = function()
    {
        var javaTimer = new JavaTimer();
        var timerTaskPrototype = {
            run: function() {
                self.loop();
                javaTimer.cancel();
            }
        };
        var timerTask = new JavaAdapter(JavaTimerTask, timerTaskPrototype);

        javaTimer.schedule(timerTask,0);
    }

    this.loop = function()
    {
        try {
            while(self.tasksExists()) {
                while(
                    self.nextTickTasksExists()
                    || self.immediateTasksExists()
                    || self.timerEventsExists()
                ) {
                    if (self.processNextTick()) {
                        continue;
                    }
                    if (self.processImmediate()) {
                        continue;
                    }
                    self.processTimer();
                }

                JavaThread.sleep(0, 50);
            }
        } catch (e) {
            console.error(e);
        }
    }

    this.immediateTasksExists = function()
    {
        if (true === process._needImmediateCallback) {
            return true;
        }

        return false;
    }

    this.nextTickTasksExists = function()
    {
        if (0 < nextTickQueue.length) {
            return true;
        }

        return false;
    }

    this.timerEventsExists = function()
    {
        if (0 < timerEvents.length) {
            return true;
        }

        return false;
    }

    this.tasksExists = function()
    {
        if (true === this.nextTickTasksExists()) {
            return true;
        }

        if (true === this.immediateTasksExists()) {
            return true;
        }

        if (true === this.timerEventsExists()) {
            return true;
        }

        // if not running only the main timer.
        if (0 < process._timerCount) {
            return true;
        }

        if (mainThread.getState() === JavaThreadState.RUNNABLE) {
            return true;
        }

        return false;
    }

    this.processNextTick = function()
    {
        if (0 < nextTickQueue.length) {
            var obj = nextTickQueue.shift();
            obj.callback();
        }
    }

    this.processImmediate = function()
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

    this.processTimer = function()
    {
        if (0 < timerEvents.length) {
            var obj = timerEvents.shift();
            obj.callback();
        }
    }
};

module.exports = Main;

