import Entity from './entity.js';
import Velocity from './velocity.js';

export function createMario(characterSprites) {
	const mario = new Entity();

	mario.position.set(64, 180);
	mario.velocity.set(2, -10);

	mario.addTrait(new Velocity());

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
