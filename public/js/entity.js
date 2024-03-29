import { Vector } from './math.js';

export class Trait {
	constructor(name) {
		this.name = name;
	}

	update() {
		console.warn('Unhandled update called in trait');
	}
}
export default class Entity {
	constructor() {
		this.position = new Vector(0, 0);
		this.vel = new Vector(0, 0);
		this.size = new Vector(0, 0);
		this.traits = [];
	}

	addTrait(trait) {
		this.traits.push(trait);
		this[trait.name] = trait;
	}

	draw() {}

	update() {
		this.traits.forEach((trait) => {
			trait.update(this);
		});
	}
}
