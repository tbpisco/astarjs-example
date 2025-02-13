import * as PIXI from 'pixi.js';
import Container = PIXI.Container;
import { MapModel } from '../models/MapModel';
import { Tile } from './Tile';
import { GameStateManager } from '../states/GameStateManager';
import { Start } from '../states/Start';
import { End } from '../states/End';
import { Build } from '../states/Build';
import { Initial } from '../states/Initial';
import { TILE } from '../../global/interfaces';

export class MapView extends Container {
	private size: number;
	public tiles = new Map();
	private map: MapModel;
	private saveTimeout: NodeJS.Timeout[] = [];

	private gameStateManager: GameStateManager;

	constructor(size: number) {
		super();
		this.size = size;
	}

	public setState(gameStateManager: GameStateManager): void {
		this.gameStateManager = gameStateManager;
	}

	public createStage(map: MapModel): void {
		this.map = map;
		this.createBorder(this.map.getCol(), this.map.getRow());
		let tile: Tile;
		this.map.get().forEach((elementRow, indexRow) => {
			elementRow.forEach((elementCol, indexCol) => {
				tile = new Tile(elementCol, indexCol, indexRow, this.size);
				tile.enable();
				tile.on('mousedown', this.onClick.bind(this, tile), this);
				this.tiles.set(`${indexCol}-${indexRow}`, tile);
				tile.x = this.size * 0.5 + indexCol * this.size;
				tile.y = this.size * 0.5 + indexRow * this.size;
				this.addChild(tile);
			});
		});
	}

	public createBorder(col: number, row: number): void {
		this.createElementBorder(TILE.BORDER_TOP_LEFT, -1, -1);

		for (let index = 0; index < row; index++) {
			this.createElementBorder(TILE.BORDER_MIDDLE_LEFT, -1, index);
		}

		this.createElementBorder(TILE.BORDER_BOTTOM_LEFT, -1, row);

		for (let index = 0; index < row; index++) {
			this.createElementBorder(TILE.BORDER_MIDDLE_RIGHT, col, index);
		}

		this.createElementBorder(TILE.BORDER_TOP_RIGHT, col, -1);

		for (let index = 0; index < col; index++) {
			this.createElementBorder(TILE.BORDER_TOP_MIDDLE, index, -1);
		}

		this.createElementBorder(TILE.BORDER_BOTTOM_RIGHT, col, row);

		for (let index = 0; index < col; index++) {
			this.createElementBorder(TILE.BORDER_BOTTOM_MIDDLE, index, row);
		}
	}

	public createElementBorder(type: number, x: number, y: number): void {
		const border = new Tile(type, 0, 0, this.size);
		border.x = this.size * 0.5 + x * this.size;
		border.y = this.size * 0.5 + y * this.size;
		this.addChild(border);
	}

	public setMap(map: MapModel): void {
		this.map = map;
	}

	public update(tile: Tile): void {
		this.map.get()[tile.getRow()][tile.getCol()] = tile.type;
	}

	public onClick(button: Tile): void {
		if (this.gameStateManager.currentState instanceof Initial) {
			this.gameStateManager.update();
			button.changeTileType();
			this.update(button);
		} else if (this.gameStateManager.currentState instanceof Build) {
			button.changeTileType();
			this.update(button);
		} else if (this.gameStateManager.currentState instanceof Start) {
			button.changeTileType(TILE.START);
			this.update(button);
			this.gameStateManager.update();
		} else if (this.gameStateManager.currentState instanceof End) {
			button.changeTileType(TILE.END);
			this.update(button);
			this.gameStateManager.update();
		}
	}

	public clearTimeoutList(): void {
		this.saveTimeout.map((t) => {
			clearTimeout(t);
		});
		this.saveTimeout = [];
	}

	public highlightRectangule(index: number, row: number, col: number, parentRow: number, parentCol: number): void {
		const tile = this.tiles.get(`${col}-${row}`);
		let direction = TILE.RIGHT;
		if (col > parentCol && row === parentRow) {
			direction = TILE.LEFT;
		} else if (col < parentCol && row === parentRow) {
			direction = TILE.RIGHT;
		} else if (col == parentCol && row < parentRow) {
			direction = TILE.BOTTOM;
		} else if (col == parentCol && row > parentRow) {
			direction = TILE.TOP;
		} else if (col < parentCol && row > parentRow) {
			direction = TILE.TOP_RIGHT;
		} else if (col < parentCol && row < parentRow) {
			direction = TILE.BOTTOM_RIGHT;
		} else if (col > parentCol && row < parentRow) {
			direction = TILE.BOTTOM_LEFT;
		} else if (col > parentCol && row > parentRow) {
			direction = TILE.TOP_LEFT;
		}

		if (index === 0) this.clearTimeoutList();
		this.saveTimeout.push(
			setTimeout(() => {
				tile.highlight(direction);
			}, 200 * index),
		);
	}
}
