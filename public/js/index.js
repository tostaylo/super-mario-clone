import SpriteSheet from './spritesheet.js';
import { loadImage, loadLevel } from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const [tiles, level, characters] = await Promise.all([
	loadImage('../images/tiles.png'),
	loadLevel('1-1'),
	loadImage('../images/characters.gif'),
]);

function drawBackground(background, context, sprites) {
	background.ranges.forEach(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				sprites.drawTile(background.tile, context, x, y);
			}
		}
	});
}
const tileSprites = new SpriteSheet(tiles, 16, 16);
tileSprites.defineTile('ground', 0, 0);
tileSprites.defineTile('sky', 3, 23);

level.backgrounds.forEach((background) => drawBackground(background, context, tileSprites));

const characterSprites = new SpriteSheet(characters, 16, 16);
characterSprites.define('mario-idle', 276, 44, 16, 16);
characterSprites.draw('mario-idle', context, 64, 64);
