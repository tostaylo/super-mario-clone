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

level.backgrounds.forEach((background) => drawBackground(background, context, tileSprites));

characterSprites.draw('mario-idle', context, 64, 64);
