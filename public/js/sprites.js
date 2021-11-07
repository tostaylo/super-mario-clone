import SpriteSheet from './spritesheet.js';

export function getTileSprites(tiles) {
	const tileSprites = new SpriteSheet(tiles, 16, 16);
	tileSprites.defineTile('ground', 0, 0);
	tileSprites.defineTile('sky', 3, 23);

	return tileSprites;
}

export function getCharacterSprites(characters) {
	const characterSprites = new SpriteSheet(characters, 16, 16);
	characterSprites.define('mario-idle', 276, 44, 16, 16);

	return characterSprites;
}
