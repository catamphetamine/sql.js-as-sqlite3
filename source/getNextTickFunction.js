// https://timnew.me/blog/2014/06/23/process-nexttick-implementation-in-browser/
export default function getNextTickFunction() {
	// In Node.js.
	if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
		// Calls the `callback` via `process.nextTick(callback, error)` to emulate "asynchronous" behavior.
		// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick#why-use-processnexttick
		return function(f) {
			process.nextTick(f)
		}
	}

	const canSetImmediate = typeof window !== 'undefined' && window.setImmediate
	const canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener

	if (canSetImmediate) {
		return function(f) {
			window.setImmediate(f)
		}
	}

	if (canPost) {
		const queue = []
		window.addEventListener('message', function(ev) {
			const source = ev.source
			if ((source === window || source === null) && ev.data === 'process-tick') {
				ev.stopPropagation()
				if (queue.length > 0) {
					const fn = queue.shift()
					fn()
				}
			}
		}, true)

		return function nextTick(fn) {
			queue.push(fn)
			window.postMessage('process-tick', '*')
		}
	}

	return function nextTick(fn) {
		setTimeout(fn, 0)
	}
}