import { loadImage, loadLevel } from './loaders.js';
import { getTileSprites, getCharacterSprites } from './sprites.js';
import { createBackgroundLayer, createCharacterLayer } from './layers.js';
import Compositor from './compositor.js';
import { createMario } from './enitities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const compositor = new Compositor();

const [tiles, level, characters] = await Promise.all([
	loadImage('../images/tiles.png'),
	loadLevel('1-1'),
	loadImage('../images/characters.gif'),
]);

const tileSprites = getTileSprites(tiles);
const characterSprites = getCharacterSprites(characters);

const mario = createMario(characterSprites);

const gravity = 0.5;

const backgroundLayer = createBackgroundLayer(level.backgrounds, tileSprites);
const characterLayer = createCharacterLayer(mario);

compositor.addLayer(backgroundLayer);
compositor.addLayer(characterLayer);

function update() {
	requestAnimationFrame(update);

	compositor.draw(context);
	mario.update();
	mario.velocity.y += gravity;
}

update();
