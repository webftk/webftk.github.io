var EventHandler = (function () {

	var callbacks = [],
			running = false,
			timers = {},
			delayedCallbacks = [];

	// fired on resize event
	function FiredEvent() {
			if (!running) {
					running = true;

					if (window.requestAnimationFrame) {
							window.requestAnimationFrame(runCallbacks);
					} else {
							setTimeout(runCallbacks, 66);
					}
			}
	}

	// run the actual callbacks
	function runCallbacks() {
			callbacks.forEach(function (callback) {
					callback();
			});

			delayedCallbacks.forEach(function (dcallback) {
					var uid = dcallback.uid;
					var ms = dcallback.delay;
					if (timers[uid]) {
							clearTimeout(timers[uid]);
					}
					timers[uid] = setTimeout(function () {
							dcallback.callback()
					}, ms);
			});
			running = false;
	}

	// adds callback to loop
	function addCallback(callback) {
			if (callback) {
					callbacks.push(callback);
			}
	}

	function CallbackDetails(callback, delay, uid) {
			this.callback = callback;
			this.delay = delay;
			this.uid = uid;
	}

	function addDelayedCallback(callback, delay, uid) {
			if (callback && delay) {
					var c = new CallbackDetails(callback, delay, uid)
					delayedCallbacks.push(c);
			}
	}

	return {
			// initalize resize event listener
			init: function (event, callback) {
					window.addEventListener(event, FiredEvent);
					addCallback(callback);
			},
			// initalize resize event listener with delay
			initWithDelay: function (event, callback, delay, uid) {
					window.addEventListener(event, FiredEvent);
					addDelayedCallback(callback, delay, uid);
			},
			// public method to add additional callback
			add: function (callback) {
					addCallback(callback);
			}
	}
}());

EventHandler.init('resize', function () {
	resizeEvents();
});

EventHandler.initWithDelay('resize', function () {

}, 300, 'DelayReInit');