import { Trait } from './entity.js';

export default class Jump extends Trait {
	constructor() {
		super('go');

		this.direction = 0;
		this.speed = 2;
	}

	update(entity) {
		entity.vel.x = this.speed * this.direction;
	}
}
