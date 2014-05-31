/**
 * Thread wrapper for internal usage.
 *
 * @module nodeschnaps/lib/thread.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

// Load Java classes
var JavaThread = java.lang.Thread;
var JavaRunnable = java.lang.Runnable;

/**
 * Creates a thread.
 *
 * @constructor
 * @param {Function} The function to run in a thread.
 */
var Thread = function(runner)
{
    var Runnable = JavaAdapter(
        JavaRunnable,
        {
            "run" : function() {
                runner();
            }
        }
    )

    // Create the thread.
    var thread = new JavaThread(Runnable);

    /**
     * Start the thread.
     */
    this.start = function()
    {
        thread.start();
    }
};

module.exports = Thread;

