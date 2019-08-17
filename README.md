# cancelable interval #
### Why? ###
When you have interval with asynchronous 
code inside and you need to prevent interval to not be executed again before asynchronous code in previous 
iteration is completed you need to [`clearInterval` by its id at the top of interval function body and then 
start it again and reassign id at the end of it.](https://gist.github.com/d0peCode/708016b96965cbf82cc81c96d0fed85c)

Issue with this is that you will never be able to stop such mechanism because its id will be reassign over and over again.

Solution is to have a function which will act like `setInterval` but additionally provide cancellation feature and actually return `cancel` function instead of interval id.

This is what this little project aim for.

### Usage demo ###

    const cancelableInterval = require('../dist/cancelableInterval');
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const foo = () => {
        const intervalFunction = async() => {
            console.log('interval executed');
            await sleep(120); //some long action
        };
        return cancelableInterval(intervalFunction, 100); //returning id
    };
    
    (() => {
        const cancellableIntervals = [];
        cancellableIntervals.push(foo());
    
        setTimeout(() => {
            console.log("Cancelling 100ms interval with 120ms of async code runtime after 700ms.");
            console.log("(100ms + 120ms) * 5 = 660ms so interval should run 3 times.");
            cancellableIntervals.forEach(cancel => { cancel() });
        }, 700)
    })();
    
  `sleep` function is just to simulate asynchronous code which runtime is longer than interval time gap.
  
  In above code I have `foo` function which contains interval' function and execute `cancelableInterval` which return
  `cancel()`. Then in IIFE I'm executing `foo` and pushing its `cancel()` to `cancellableIntervals` array. After 700ms I'm cancelling every
  element of `cancellableIntervals` (one in example for simplicity).
