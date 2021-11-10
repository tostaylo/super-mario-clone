export const KEY_STATES = { PRESSED: 1, RELEASED: 0 };
export const KEY_MAP = { SPACE: 32 };

export default class Keyboard {
	constructor() {
		this.keyStates = new Map();
		this.keyCallbacks = new Map();
	}

	addMapping(keycode, callback) {
		this.keyCallbacks.set(keycode, callback);
	}

	handleEvent(event) {
		const { keyCode } = event;
		const { PRESSED, RELEASED } = KEY_STATES;

		if (!this.keyCallbacks.has(keyCode)) {
			return;
		}
		event.preventDefault();

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.keyStates.get(keyCode) === keyState) {
			return;
		}

		this.keyStates.set(keyCode, keyState);

		this.keyCallbacks.get(keyCode)(keyState);
	}

	listenTo(window) {
		['keydown', 'keyup'].forEach((eventType) => {
			window.addEventListener(eventType, (event) => {
				this.handleEvent(event);
			});
		});
	}
}
