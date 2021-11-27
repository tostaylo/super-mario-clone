export const KEY_STATES = { PRESSED: 1, RELEASED: 0 };
export const KEY_MAP = {
	SPACE: 'Space',
	RIGHT: 'ArrowRight',
	LEFT: 'ArrowLeft',
};

export default class Keyboard {
	constructor() {
		this.keyStates = new Map();
		this.keyCallbacks = new Map();
	}

	addMapping(code, callback) {
		this.keyCallbacks.set(code, callback);
	}

	handleEvent(event) {
		const { code } = event;
		const { PRESSED, RELEASED } = KEY_STATES;

		if (!this.keyCallbacks.has(code)) {
			return;
		}
		event.preventDefault();

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.keyStates.get(code) === keyState) {
			return;
		}

		this.keyStates.set(code, keyState);

		this.keyCallbacks.get(code)(keyState);
	}

	listenTo(window) {
		['keydown', 'keyup'].forEach((eventType) => {
			window.addEventListener(eventType, (event) => {
				this.handleEvent(event);
			});
		});
	}
}
