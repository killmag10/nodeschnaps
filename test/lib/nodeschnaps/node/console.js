var should = require('should');

exports.test = function(){
    console.log('console.log',1,2,{ 'test' : 'abc' });
    console.info('console.info',1,2,{ 'test' : 'abc' });
    console.error('console.error',1,2,{ 'test' : 'abc' });
    console.warn('console.warn',1,2,{ 'test' : 'abc' });
    console.dir({ 'test' : 'abc' });
    console.time('test');
    console.timeEnd('test');
    console.trace('test trace');
    console.assert(true,'test');
    try{
        console.assert(false,'test');
    } catch(e) {
        console.log(e);
    }
    
    setTimeout(function(){
        
        console.log('TIMER')    
        
    },100);
}
