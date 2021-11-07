import { loadImage, loadLevel } from './loaders.js';
import { drawBackground } from './draw.js';
import { getTileSprites, getCharacterSprites } from './sprites.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const [tiles, level, characters] = await Promise.all([
	loadImage('../images/tiles.png'),
	loadLevel('1-1'),
	loadImage('../images/characters.gif'),
]);

const tileSprites = getTileSprites(tiles);
const characterSprites = getCharacterSprites(characters);

const pos = { x: 64, y: 64 };

class Compositor {
	constructor() {
		this.layers = [];
	}

	draw(context) {
		this.layers.forEach((layer) => layer(context));
	}
	addLayer(layer) {
		this.layers.push(layer);
	}
}
function createBackgroundLayer(backgrounds, sprites) {
	const backgroundBuffer = document.createElement('canvas');
	backgroundBuffer.width = 256;
	backgroundBuffer.height = 240;

	backgrounds.forEach((background) => {
		drawBackground(background, backgroundBuffer.getContext('2d'), sprites);
	});

	return (context) => {
		context.drawImage(backgroundBuffer, 0, 0);
	};
}
const compositor = new Compositor();
const backgroundLayer = createBackgroundLayer(level.backgrounds, tileSprites);
compositor.addLayer(backgroundLayer);

function update() {
	requestAnimationFrame(update);
	compositor.draw(context);
	characterSprites.draw('mario-idle', context, pos.x, pos.y);
	pos.x += 2;
	pos.y += 2;
}

update();
