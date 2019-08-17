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