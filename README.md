# cancelable interval #
### Why? ###
Sometimes you have interval with asynchronous 
code inside and you need to prevent interval to not be executed again before previous iteration is not completed. 
This is especially necessary when additionally your asynchronous code may run longer than interval gap time.

### How? ###
Providing little function which works like `setInterval` but return `cancel` function instead of its id.

### Usage demo ###

    const cancelableInterval = require('../dist/cancelableInterval');
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const foo = () => {
        const intervalId = async() => {
            console.log('interval executed');
            await sleep(120); //some long action
        };
        return cancelableInterval(intervalId, 100); //returning id
    };
    
    (() => {
        const intervalIds = [];
        intervalIds.push(foo());
    
        setTimeout(() => {
            console.log("Cancelling 100ms interval with 120ms of async code runtime after 700ms.");
            console.log("(100ms + 120ms) * 5 = 660ms so interval should run 3 times.");
            intervalIds.forEach(cancel => { cancel() });
        }, 700)
    })();
