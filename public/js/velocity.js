import { Trait } from './entity.js';

export default class Velocity extends Trait {
	constructor() {
		super('velocity');
	}

	update(entity) {
		entity.position.x += entity.vel.x;
		entity.position.y += entity.vel.y;
	}
}
