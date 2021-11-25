export function createBackgroundLayer(level) {
	const backgroundBuffer = document.createElement('canvas');
	backgroundBuffer.width = 656;
	backgroundBuffer.height = 240;

	const context = backgroundBuffer.getContext('2d');

	level.tiles.forEach((tile, x, y) => {
		level.sprites.forEach((sprite) =>
			sprite.drawTile(tile.name, context, x, y)
		);
	});

	return (context) => {
		context.drawImage(backgroundBuffer, 0, 0);
	};
}

export function createEntityLayer(entity) {
	return (context) => entity.draw(context);
}

export function createCollisionLayer(level) {
	let resolvedTiles = [];
	const tileResolver = level.tileCollider.tiles;
	const tileSize = tileResolver.tileSize;
	const getByIndexOriginal = tileResolver.getByIndex;

	tileResolver.getByIndex = function getByIndexFake(x, y) {
		resolvedTiles.push({ x, y });
		return getByIndexOriginal.call(tileResolver, x, y);
	};

	// Drawing the collision box for debugging
	return (context) => {
		context.strokeStyle = 'blue';
		resolvedTiles.forEach(({ x, y }) => {
			context.beginPath();
			context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
			context.stroke();
		});

		context.strokeStyle = 'yellow';
		level.entities.forEach((entity) => {
			context.beginPath();
			context.rect(
				entity.position.x,
				entity.position.y,
				entity.size.x,
				entity.size.y
			);
			context.stroke();
		});
		resolvedTiles = [];
	};
}
