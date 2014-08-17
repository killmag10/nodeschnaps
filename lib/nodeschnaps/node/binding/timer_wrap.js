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
 * @see
 * @constructor
 * @this {Timer}
 */
var Timer = function()
{
    var self = this;

    // Create new Timer
    var javaTimer = null;

    // Create new TimerTask
    var timerTaskPrototype = {
        run: function() {

            javaTimer && javaTimer.cancel();
            javaTimer = null;

            while (!self.ontimeout) {
                JavaThread.sleep(0, 50);
            }

            process._addTimerEvent(self.ontimeout.bind(self));
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
        process._timerCount++;

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
     * Dummy to reference Timer
     *
     * Not Supported.
     */
    this.ref = function(){};

    /**
     * Dummy to reference Timer
     *
     * Not Supported.
     */
    this.unref = function(){};

    /**
     * Close the Timer.
     */
    this.close = function()
    {
        process._timerCount--;
        javaTimer && javaTimer.cancel();
        javaTimer = null;
    };
};

/**
 * Alias for Date.now on Timer.
 */
Timer.now = Date.now;

module.exports.Timer = Timer;

