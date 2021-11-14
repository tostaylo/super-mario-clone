import { loadImage, loadLevel } from './loaders.js';
import { getTileSprites, getCharacterSprites } from './sprites.js';
import { createMario } from './enitities.js';
import Keyboard, { KEY_STATES, KEY_MAP } from './keyboard.js';
import Level from './level.js';

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
const background = { background: levelJson.backgrounds, sprites: tileSprites };

const input = new Keyboard();
input.addMapping(KEY_MAP.SPACE, function (keyState) {
	const { PRESSED, RELEASED } = KEY_STATES;

	switch (keyState) {
		case PRESSED:
			mario.jump.start();
			break;
		case RELEASED:
			mario.jump.cancel();
			break;

		default:
			mario.jump.cancel();
	}
});

input.listenTo(window);

// TODO - How to get the Entity to know about the gravity and
// put updateMario within mario.update so we don't need to pass it into
// level.update()
const gravity = 0.5;
function updateMario() {
	mario.vel.y += gravity;
}

const level = new Level(context);

level.addBackgrounds([background]);
level.addEntities([mario]);
level.addLayers();
level.update(updateMario);
