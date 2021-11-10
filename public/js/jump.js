import { Trait } from './entity.js';

export default class Jump extends Trait {
	constructor() {
		super('jump');

		this.duration = 0.5;
		this.velocity = 200;
		this.engageTime = 0;
	}

	start() {
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity) {
		if (this.engageTime > 0) {
			// this should be set = -this.velocity but 200 is too much
			entity.vel.y = -3;
		}
	}
}
