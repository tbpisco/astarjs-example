import * as PIXI from 'pixi.js';
import Texture = PIXI.Texture;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
export declare enum TILE {
	GREEN = 0,
	GRASS = 1,
	WATER = 2,
	TREES = 3,
	START = 4,
	END = 5,
	BORDER_TOP_LEFT = 6,
	BORDER_MIDDLE_LEFT = 7,
	BORDER_BOTTOM_LEFT = 8,
	BORDER_TOP_MIDDLE = 9,
	BORDER_BOTTOM_MIDDLE = 10,
	BORDER_TOP_RIGHT = 11,
	BORDER_MIDDLE_RIGHT = 12,
	BORDER_BOTTOM_RIGHT = 13,
	MOUNTAIN = 14,
	MOUNTAIN_BROWN = 15,
	TOP_RIGHT = 16,
	TOP_LEFT = 17,
	TOP = 18,
	BOTTOM = 19,
	RIGHT = 20,
	LEFT = 21,
	BOTTOM_LEFT = 22,
	BOTTOM_RIGHT = 23,
	HOUSE = 24,
}
export declare class Tile extends Sprite {
	private size;
	private col;
	private row;
	type: number;
	typePos: number;
	availableTypes: number[];
	background: Sprite;
	element: Sprite;
	private texSize;
	constructor(type: number, col: number, row: number, size: number);
	setTypePos(type: number): void;
	getCol(): number;
	getRow(): number;
	disable(): void;
	enable(): void;
	changeTileType(type?: number): void;
	update(): void;
	highlight(direction: number): void;
	getTexture(type: number): Texture;
	getFrameByType(type: number): Rectangle;
}
