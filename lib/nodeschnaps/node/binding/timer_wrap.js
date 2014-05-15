var JavaTimer = java.util.Timer;
var JavaTimerTask = java.util.TimerTask;

var javaTimer = new JavaTimer(false);
var unpurgedCount = 0;
var maxUnpurgedCount = 100;

var Timer = function()
{
    var self = this;
    
    this.ontimeout = null;
    
    this.ref = function(){};
    
    var started = false;
    var timerCallback = function()
    {
        javaTimer.purge();
        self.ontimeout && self.ontimeout();
    }

    var timerTask = new JavaAdapter(JavaTimerTask,{run: timerCallback});
    
    this.start = function(timeout,repeat)
    {        
        if (started !== false) {
            throw new Error('Timer already started.');
        }
        
        unpurgedCount++;
        if(unpurgedCount > maxUnpurgedCount) {
            javaTimer.purge();
            unpurgedCount = 0;  
        }
        started = true;
        if(repeat > 0) {
            throw new Error('repeat not supported');
        } else {
            console.log('schedule')   
            javaTimer.schedule(timerTask,timeout);
        }
    };
    
    this.stop = function()
    {
        timerTask.cancel();
            
        javaTimer.purge();
    };
    
    this.setRepeat = function()
    {
        throw new Error('setRepeat not supported');
    };
    
    this.getRepeat = function()
    {
        throw new Error('getRepeat not supported');
    };
    
    this.again = function()
    {
        throw new Error('getRepeat not supported');
    };
    
    this.unref = function()
    {
        javaTimer.purge();
    }; 
    
    this.close = function()
    {
        javaTimer.purge();
    };
}

module.exports.Timer = Timer;
