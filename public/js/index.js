import { loadImage, loadLevel } from './loaders.js';
import { getTileSprites, getCharacterSprites } from './sprites.js';
import { createMario } from './enitities.js';
import Level from './level.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

// TODO - LoadLevel should be called within level. And a new Level should
// be returned in this promise.all
const [tiles, levelJson, characters] = await Promise.all([
	loadImage('../images/tiles.png'),
	loadLevel('1-1'),
	loadImage('../images/characters.gif'),
]);

const tileSprites = getTileSprites(tiles);
const characterSprites = getCharacterSprites(characters);

const mario = createMario(characterSprites);
entityDebugger(mario);
setupKeyboard(mario).listenTo(window);

const level = new Level(context);

const background = { background: levelJson.backgrounds };
const sprites = { sprite: tileSprites };

level.addSprites([sprites]);
level.addBackgrounds([background]);
level.addEntities([mario]);
level.addTiles();
level.addLayers();
level.addToCompositor();
level.update();

function entityDebugger(entity) {
	['mousedown', 'mousemove'].forEach((eventName) => {
		canvas.addEventListener(eventName, (event) => {
			if (event.buttons === 1) {
				entity.vel.set(0, 0);
				entity.position.set(event.offsetX, event.offsetY);
			}
		});
	});
}
