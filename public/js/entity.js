import { Vector } from './math.js';

export class Trait {
	constructor(name) {
		console.log(name);
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
		this.traits = [];
	}

	addTrait(trait) {
		this.traits.push(trait);
		this[trait.name] = trait;
		console.log(trait);
		console.log(this);
	}

	draw() {}

	update() {
		this.traits.forEach((trait) => {
			trait.update(this);
		});
	}
}
