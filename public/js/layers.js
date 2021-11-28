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

	return function drawBackgroundLayer(context, camera) {
		context.drawImage(backgroundBuffer, -camera.position.x, -camera.position.y);
	};
}

export function createEntityLayer(entity, width = 64, height = 64) {
	const entityBuffer = document.createElement('canvas');
	entityBuffer.width = width;
	entityBuffer.height = height;

	const entityBufferContext = entityBuffer.getContext('2d');

	return function drawEntityLayer(context, camera) {
		entityBufferContext.clearRect(0, 0, width, height);

		entity.draw(entityBufferContext);

		context.drawImage(
			entityBuffer,
			entity.position.x - camera.position.x,
			entity.position.y - camera.position.y
		);
	};
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

	return function drawCollisionLayer(context, camera) {
		// Drawing the collision box for debugging
		context.strokeStyle = 'blue';
		resolvedTiles.forEach(({ x, y }) => {
			context.beginPath();
			context.rect(
				x * tileSize - camera.position.x,
				y * tileSize - camera.position.y,
				tileSize,
				tileSize
			);
			// Drawing the collision box for debugging
			context.stroke();
		});

		// Drawing the collision box for debugging
		context.strokeStyle = 'yellow';
		level.entities.forEach((entity) => {
			context.beginPath();
			context.rect(
				entity.position.x - camera.position.x,
				entity.position.y - camera.position.y,
				entity.size.x,
				entity.size.y
			);
			// Drawing the collision box for debugging
			context.stroke();
		});
		resolvedTiles = [];
	};
}
