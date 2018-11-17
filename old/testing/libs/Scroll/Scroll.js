var ticking = false;

function onScroll() {
    requestTick();
}

function requestTick() {
    if (!ticking) {
        requestAnimFrame(update);
        ticking = true;
    }
}

function update() {

    scrollEvents();

    // allow further rAFs to be called
    ticking = false;
}

// only listen for scroll events
window.addEventListener('scroll', onScroll, false);

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();