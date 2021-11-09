import Entity from './entity.js';

export function createMario(characterSprites) {
	const mario = new Entity();
	mario.position.set(64, 180);
	mario.velocity.set(2, -10);
	mario.update = function () {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	};

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
