/**
 * Timer Binding Wrapper
 *
 * @module nodeschnaps/lib/node/binding/timer_wrap
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
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
    var started = false;

    // Create new Timer
    var javaTimer = new JavaTimer();

    // Create new TimerTask
    var timerTaskPrototype = {
        run: function() {
            self.ontimeout && self.ontimeout();
            javaTimer.cancel();
        }
    };

    var timerTask = new JavaAdapter(JavaTimerTask, timerTaskPrototype);

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
        if (started !== false) {
            // exit already started
            return;
        }

        started = true;
        if (repeat > 0) {
            throw new Error('repeat not supported');
        }

        javaTimer.schedule(timerTask,timeout);
    };

    /**
     * Stop the Timer.
     */
    this.stop = function()
    {
        javaTimer.cancel();
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
        javaTimer.cancel();
    };
};

module.exports.Timer = Timer;

