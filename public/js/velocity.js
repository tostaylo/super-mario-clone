import { Trait } from './entity.js';

export default class Velocity extends Trait {
	constructor() {
		super('velocity');
	}

	update(entity) {
		entity.position.x += entity.velocity.x;
		entity.position.y += entity.velocity.y;
	}
}
