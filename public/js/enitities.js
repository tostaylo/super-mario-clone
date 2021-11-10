import Entity from './entity.js';
import Velocity from './velocity.js';
import Jump from './jump.js';

export function createMario(characterSprites) {
	const mario = new Entity();

	mario.position.set(64, 180);

	mario.addTrait(new Velocity());
	mario.addTrait(new Jump());

	mario.draw = function (context) {
		characterSprites.draw(
			'mario-idle',
			context,
			this.position.x,
			this.position.y
		);
	};

	return mario;
}
