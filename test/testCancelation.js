const cancelableInterval = require('../dist/cancelableInterval');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const foo = () => {
    const intervalId = async() => {
        await sleep(120); //some long action
        console.log('interval async');
        // If you had more logic here, you could short-circuit it by checking token.cancelled
        // If you wanted not to continue the timer, you'd call cancel here
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