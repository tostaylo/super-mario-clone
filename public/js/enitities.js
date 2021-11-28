import Entity from './entity.js';
// import Velocity from './velocity.js';
import Jump from './jump.js';
import Go from './go.js';

export function createMario(characterSprites) {
	const mario = new Entity();

	mario.size.set(14, 16);
	mario.position.set(64, 180);

	mario.addTrait(new Go());
	mario.addTrait(new Jump());
	// mario.addTrait(new Velocity());

	mario.draw = function (context) {
		characterSprites.draw('mario-idle', context, 0, 0);
	};

	return mario;
}
