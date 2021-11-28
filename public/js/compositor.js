export default class Compositor {
	constructor() {
		this.layers = [];
	}

	draw(context, camera) {
		console.log({ camera });
		this.layers.forEach((layer) => layer(context, camera));
	}
	addLayer(layer) {
		this.layers.push(layer);
	}
}
