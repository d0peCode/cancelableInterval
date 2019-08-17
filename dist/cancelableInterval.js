function cancelableInterval(callback, ms, ...args) {
    let token = { cancelled: false };
    let running = false;
    async function wrapper(...args) {
        if (!running) {
            running = true;
            await callback(token, ...args);
            running = false;
        }
        if (!token.cancelled) {
            id = setTimeout(wrapper, ms, ...args);
        }
    }
    let id = setTimeout(wrapper, ms, ...args);
    return function cancel() {
        clearInterval(id);
        token.cancelled = true;
    }
}

module.exports = cancelableInterval;