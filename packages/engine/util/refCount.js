export const incrementCounter = (function() {
    let counter = 0;
    return function() {
        counter++;
        return counter;
    }
})();