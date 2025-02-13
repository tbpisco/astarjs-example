export declare class MapModel {
	private map;
	private row;
	private col;
	constructor(col: number, row: number, isRandom: boolean);
	get(): number[][];
	getCol(): number;
	getRow(): number;
	createEmptyMap(col: number, row: number): number[][];
	createRandomMap(col: number, row: number): number[][];
}
