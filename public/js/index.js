import SpriteSheet from './spritesheet.js';
import { loadImage } from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.fillRect(0, 0, 50, 50);

const image = await loadImage('../images/tiles.png');

const sprites = new SpriteSheet(image, 15.5, 15.5);
sprites.define('ground', 0, 0);
sprites.define('sky', 3, 21);
sprites.draw('sky', context, 45, 62);
