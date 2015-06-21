/**
 * Timer Binding Wrapper
 *
 * @module nodeschnaps/lib/node/binding/timer_wrap
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaThread = java.lang.Thread;
var JavaTimer = java.util.Timer;
var JavaTimerTask = java.util.TimerTask;

/**
 * Timer binding.
 *
 * @constructor
 * @this {Timer}
 */
var Timer = function()
{
    var self = this;

    // Create new Timer
    var javaTimer = null;

    // counter of open tasks
    var openTasks = 0;

    // Is unrefd from main loop
    var unrefd = true;

    // Create new TimerTask
    var timerTaskPrototype = {
        run: function() {

            javaTimer && javaTimer.cancel();
            javaTimer = null;

            while (!self[Timer.kOnTimeout]) {
                JavaThread.sleep(0, 50);
            }

            process._addTimerEvent(self[Timer.kOnTimeout].bind(self));
        }
    };

    var timerTask = null;

    /**
     * Callback on Timer event.
     *
     * @this {function|null} A function or null.
     */
    this.ontimeout = null;

    /**
     * Start the Timer.
     *
     * @param {number} The timeout in milliseconds.
     * @param {number} Times to repeat (currently not supported).
     */
    this.start = function(timeout, repeat)
    {
        if (javaTimer !== null) {
            // exit already started
            return;
        }

        if (repeat > 0) {
            throw new Error('repeat not supported');
        }
        timerTask = new JavaAdapter(JavaTimerTask, timerTaskPrototype);
        javaTimer = new JavaTimer();
        openTasks++;
        self.ref();

        javaTimer.schedule(timerTask, new Number(timeout));
    };

    /**
     * Stop the Timer.
     */
    this.stop = function()
    {
        timerTask.cancel();
    };

    /**
     * Not Supported.
     *
     * @throws {Error}
     */
    this.setRepeat = function()
    {
        throw new Error('setRepeat not supported');
    };

    /**
     * Not Supported.
     *
     * @throws {Error}
     */
    this.getRepeat = function()
    {
        throw new Error('getRepeat not supported');
    };

    /**
     * Not Supported.
     *
     * @throws {Error}
     */
    this.again = function()
    {
        throw new Error('again not supported');
    };

    /**
     * Ref Timer with main loop.
     */
    this.ref = function()
    {
        if (!unrefd) return;

        process._timerCount++;
        unrefd = false;
    };

    /**
     * Unref Timer from main loop.
     */
    this.unref = function()
    {
        if (unrefd) return;

        process._timerCount--;
        unrefd = true;
    };

    /**
     * Close the Timer.
     */
    this.close = function()
    {
        if (openTasks > 0) {
            if (openTasks === 1) {
                javaTimer && javaTimer.cancel();
                javaTimer = null;
            }
            openTasks--;

            self.unref();
        }
    };
};

/**
 * Alias for Date.now on Timer.
 */
Timer.now = Date.now;

Timer.kOnTimeout = 0;

module.exports.Timer = Timer;

