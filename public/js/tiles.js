export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new TileResolver(tileMatrix);
	}

	// TODO: OPTIMIZATION: EPISODE 5 1:16:00
	checkY(entity) {
		const matches = this.tiles.searchByRange(
			entity.position.x,
			entity.position.x + entity.size.x,
			entity.position.y,
			entity.position.y + entity.size.y
		);

		matches.forEach((match) => {
			if (!match) return console.log('no match');

			if (match.tile.name !== 'ground') return;

			if (entity.vel.y === 0) return;

			// Checks for ground collision
			if (entity.vel.y > 0) {
				if (entity.position.y + entity.size.y > match.y1) {
					entity.position.y = match.y1 - entity.size.y;
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
		});
	}

	// TODO: OPTIMIZATION: EPISODE 5 1:16:00
	checkX(entity) {
		const matches = this.tiles.searchByRange(
			entity.position.x,
			entity.position.x + entity.size.x,
			entity.position.y,
			entity.position.y + entity.size.y
		);

		matches.forEach((match) => {
			if (!match) return console.log('no match');

			if (match.tile.name !== 'ground') return;

			if (entity.vel.x === 0) return;

			// Checks for right collision I think
			if (entity.vel.x > 0) {
				if (entity.position.x + entity.size.x > match.x1) {
					entity.position.x = match.x1 - entity.size.x;
					entity.vel.x = 0;
				}
			}
			// Checks for left collision I think
			else if (entity.vel.x < 0) {
				if (entity.position.x < match.x2) {
					entity.position.x = match.x2;
					entity.vel.x = 0;
				}
			}
		});
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

	// returns range of tiles between two positions
	// useful in detecting collisions
	toIndexRange(pos1, pos2) {
		const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
		const range = [];
		let pos = pos1;

		do {
			range.push(this.toIndex(pos));
			pos += this.tileSize;
		} while (pos < pMax);

		return range;
	}

	getByIndex(indexX, indexY) {
		const tile = this.matrix.get(indexX, indexY);

		if (tile) {
			const y1 = indexY * this.tileSize;
			const y2 = y1 + this.tileSize;
			const x1 = indexX * this.tileSize;
			const x2 = x1 + this.tileSize;

			return { tile, y1, y2, x1, x2 };
		}
	}

	searchByPosition(posX, posY) {
		return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
	}

	searchByRange(x1, x2, y1, y2) {
		const matches = [];
		this.toIndexRange(x1, x2).forEach((indexX) =>
			this.toIndexRange(y1, y2).forEach((indexY) => {
				const match = this.getByIndex(indexX, indexY);
				matches.push(match);
			})
		);
		return matches;
	}
}
