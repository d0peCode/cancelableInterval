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