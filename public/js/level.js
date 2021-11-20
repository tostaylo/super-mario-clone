import Compositor from './compositor.js';
import { createEntityLayer, createBackgroundLayer } from './layers.js';
import { Matrix } from './math.js';
export default class Level {
	constructor(context) {
		this.compositor = new Compositor();
		this.entities = new Set();
		this.backgrounds = new Set();
		this.sprites = new Set();
		this.layers = [];
		this.context = context;
		this.update = this.update.bind(this);
		this.tiles = new Matrix();
	}

	update(updater) {
		requestAnimationFrame(() => this.update(updater));
		this.compositor.draw(this.context);
		this.entities.forEach((entity) => entity.update());
		updater();
	}

	addToCompositor() {
		this.layers.forEach((layer) => this.compositor.addLayer(layer));
	}

	addEntities(entities) {
		entities.forEach((entity) => {
			this.entities.add(entity);
		});
	}

	addBackgrounds(backgrounds) {
		backgrounds.forEach(({ background }) => {
			this.backgrounds.add(background);
		});
	}

	addSprites(sprites) {
		sprites.forEach(({ sprite }) => {
			this.sprites.add(sprite);
		});
	}

	addTiles() {
		this.backgrounds.forEach((backgrounds) => {
			backgrounds.forEach(({ ranges, tile }) => {
				ranges.forEach(([x1, x2, y1, y2]) => {
					for (let x = x1; x < x2; x++) {
						for (let y = y1; y < y2; y++) {
							this.tiles.set(x, y, { name: tile });
						}
					}
				});
			});
		});
	}

	addLayers() {
		this.layers.push(createBackgroundLayer(this));
		this.layers.push(createEntityLayer(this.entities.values().next().value));
	}
}
