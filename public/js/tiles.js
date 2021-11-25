export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new TileResolver(tileMatrix);
	}

	test(entity) {
		this.checkY(entity);
		const match = this.tiles.matchByPosition(
			entity.position.x,
			entity.position.y
		);
		if (match) console.log(match);
	}
	checkY(entity) {
		const match = this.tiles.matchByPosition(
			entity.position.x,
			entity.position.y
		);

		if (!match) return;

		if (match.tile.name !== 'ground') return;

		// Checks if for ground collision
		if (entity.vel.y > 0) {
			if (entity.position.y > match.y1) {
				entity.position.y = match.y1;
				entity.vel.y = 0;
			}
		}
		// Checks for ceiling collision
		else if (entity.vel.y < 0) {
			if (entity.position.y < match.y2) {
				entity.position.y = match.y2;
				entity.vel.y = 0;
			}
		}
	}
}

export class TileResolver {
	constructor(matrix, tileSize = 16) {
		this.matrix = matrix;
		this.tileSize = tileSize;
	}

	toIndex(pos) {
		return Math.floor(pos / this.tileSize);
	}

	getByIndex(indexX, indexY) {
		const tile = this.matrix.get(indexX, indexY);

		if (tile) {
			const y1 = indexY * this.tileSize;
			const y2 = y1 + this.tileSize;

			return { tile, y1, y2 };
		}
	}

	matchByPosition(posX, posY) {
		return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
	}
}
