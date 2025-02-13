import { TILE } from '../../global/interfaces';

export class MapModel {
	private map: number[][];
	private row: number;
	private col: number;

	constructor(col: number, row: number, isRandom: boolean) {
		this.map = isRandom ? this.createRandomMap(col, row) : this.createEmptyMap(col, row);
		this.row = row;
		this.col = col;
	}

	public get(): number[][] {
		return this.map;
	}

	public getCol(): number {
		return this.col;
	}

	public getRow(): number {
		return this.row;
	}

	public createEmptyMap(col: number, row: number): number[][] {
		const array: number[][] = [];
		for (let index = 0; index < row; index++) {
			array.push(new Array(col).fill(TILE.GREEN));
		}
		return array;
	}

	public createRandomMap(col: number, row: number): number[][] {
		const array: number[][] = [];
		let num: number;
		for (let index = 0; index < row; index++) {
			array.push(
				new Array(col).fill(0).map(() => {
					num = Math.floor(Math.random() * 20);
					if (num < 14) {
						return TILE.GREEN;
					} else if (num < 15) {
						return TILE.GRASS;
					} else if (num == 16) {
						return TILE.HOUSE;
					} else if (num == 17) {
						return TILE.MOUNTAIN_BROWN;
					} else if (num == 18) {
						return TILE.MOUNTAIN;
					} else if (num == 19) {
						return TILE.WATER;
					} else {
						return TILE.TREES;
					}
				}),
			);
		}

		const r = Math.floor(Math.random() * row);
		const c = Math.floor(Math.random() * col);

		array[r][c] = TILE.START;

		let r0 = Math.floor(Math.random() * row);
		let c0 = Math.floor(Math.random() * col);

		while (r0 == r && c0 == c) {
			r0 = Math.floor(Math.random() * row);
			c0 = Math.floor(Math.random() * col);
		}
		array[r0][c0] = TILE.END;

		return array;
	}
}
