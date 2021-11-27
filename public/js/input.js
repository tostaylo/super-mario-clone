import Keyboard, { KEY_STATES, KEY_MAP } from './keyboard.js';

export function setupKeyboard(entity) {
	const input = new Keyboard();

	input.addMapping(KEY_MAP.SPACE, function (keyState) {
		const { PRESSED, RELEASED } = KEY_STATES;

		switch (keyState) {
			case PRESSED:
				entity.jump.start();
				break;
			case RELEASED:
				entity.jump.cancel();
				break;

			default:
				entity.jump.cancel();
		}
	});

	input.addMapping(KEY_MAP.RIGHT, function (keyState) {
		entity.go.direction = keyState;
	});

	input.addMapping(KEY_MAP.LEFT, function (keyState) {
		entity.go.direction = -keyState;
	});

	return input;
}
