import { drawBackground } from './draw.js';

export function createBackgroundLayer(backgrounds, sprites) {
	const backgroundBuffer = document.createElement('canvas');
	backgroundBuffer.width = 656;
	backgroundBuffer.height = 240;

	backgrounds.forEach((background) => {
		drawBackground(background, backgroundBuffer.getContext('2d'), sprites);
	});

	return (context) => {
		context.drawImage(backgroundBuffer, 0, 0);
	};
}

export function createEntityLayer(entity) {
	return (context) => entity.draw(context);
}
