export function createBackgroundLayer(level, sprites) {
	const backgroundBuffer = document.createElement('canvas');
	backgroundBuffer.width = 656;
	backgroundBuffer.height = 240;

	const context = backgroundBuffer.getContext('2d');

	level.tiles.forEach((tile, x, y) => {
		sprites.drawTile(tile.name, context, x, y);
	});

	return (context) => {
		context.drawImage(backgroundBuffer, 0, 0);
	};
}

export function createEntityLayer(entity) {
	return (context) => entity.draw(context);
}
