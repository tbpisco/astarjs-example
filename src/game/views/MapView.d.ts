import * as PIXI from 'pixi.js';
import { MapModel } from '../models/MapModel';
import { Tile } from './Tile';
import { GameStateManager } from '../states/GameStateManager';
import Container = PIXI.Container;
export declare class MapView extends Container {
	private size;
	tiles: Map<string, Tile>;
	private map;
	private saveTimeout;
	private gameStateManager;
	constructor(size: number);
	setState(gameStateManager: GameStateManager): void;
	createStage(map: MapModel): void;
	createBorder(col: number, row: number): void;
	createElementBorder(type: number, x: number, y: number): void;
	setMap(map: MapModel): void;
	update(tile: Tile): void;
	onClick(button: Tile): void;
	clearTimeoutList(): void;
	highlightRectangule(index: number, row: number, col: number, parentRow: number, parentCol: number): void;
}
