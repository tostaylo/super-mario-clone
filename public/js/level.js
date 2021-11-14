import Compositor from './compositor.js';
import { createEntityLayer, createBackgroundLayer } from './layers.js';

export default class Level {
	constructor(context) {
		this.compositor = new Compositor();
		this.entities = new Set();
		this.backgrounds = new Set();
		this.layers = [];
		this.context = context;
		this.update = this.update.bind(this);
	}

	update(updater) {
		requestAnimationFrame(() => this.update(updater));
		this.compositor.draw(this.context);
		this.entities.forEach((entity) => entity.update());
		updater();
	}

	addLayers() {
		this.layers.forEach((layer) => this.compositor.addLayer(layer));
	}

	addEntities(entities) {
		entities.forEach((entity) => {
			this.entities.add(entity);
			this.layers.push(createEntityLayer(entity));
		});
	}

	addBackgrounds(backgrounds) {
		backgrounds.forEach(({ background, sprites }) => {
			this.backgrounds.add(background);
			this.layers.push(createBackgroundLayer(background, sprites));
		});
	}
}
