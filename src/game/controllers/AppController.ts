import * as PIXI from 'pixi.js';
import { MapView } from '../views/MapView';
import { PathFinding, Heuristic } from 'astarjs';
import { MapModel } from '../models/MapModel';
import { Title } from '../components/Title';
import { Instructions } from '../components/Instructions';
import { GameStateManager } from '../states/GameStateManager';
import Button from '../components/Button';
import Application = PIXI.Application;
import { SettingsMenu } from '../components/SettingsMenu';
import { AssetsData } from '../../data/assets';
import { Assets } from 'pixi.js';
import { GameButtonId, GameState, GameStateUpdate, PathfindingType, TILE } from '../../global/interfaces';
import { Tile } from '../views/Tile';

export class AppController {
	private size: number = 16;
	private mapCol: number = 50;
	private mapRow: number = 26;
	private mapPaddingTopBottom: number = this.size * 9;
	private mapPaddingLeftRight: number = this.size * 2;

	private gameStateManager: GameStateManager;
	private pathFindingManager: PathFinding;

	private mapView: MapView = new MapView(this.size);
	private domElement: HTMLDivElement;
	private app: Application;

	private randomMode: boolean = false;

	private map: MapModel;

	public instructions: Instructions;
	public buttonDone: Button;
	public buttonRandom: Button;
	public buttonReset: Button;
	public buttonRepeat: Button;
	public settingsMenu: SettingsMenu;

	public async init() {
		await Assets.init({ manifest: AssetsData });
		this.load();
	}

	public async load() {
		await Assets.loadBundle('game');
		const width = this.size * this.mapCol + this.mapPaddingLeftRight;
		const height = this.size * (this.mapRow + 2) + this.mapPaddingTopBottom;
		this.setup(width, height);
	}

	public async setup(width: number, height: number) {
		PIXI.TexturePool.textureOptions.scaleMode = 'nearest';
		this.app = new Application();
		await this.app.init({ width, height, backgroundAlpha: 0, resolution: 1, antialias: true });
		const domElement = document.body.querySelector('#map');
		if (domElement) this.domElement = domElement as HTMLDivElement;
		this.domElement.appendChild(this.app.canvas);

		const infoElement = document.body.querySelector('#info') as HTMLDivElement;
		infoElement.setAttribute('style', 'width:' + width + 'px');

		this.gameStateManager = new GameStateManager(this);
		this.mapView.setState(this.gameStateManager);
		this.setupView(width);
	}

	public setupView(width: number): void {
		const title = new Title('aStarJS Example', width);
		title.x = width * 0.5;
		title.y = title.height * 0.5;
		this.app.stage.addChild(title);

		this.instructions = new Instructions(this.gameStateManager.currentState.instructions, width);
		this.instructions.x = width * 0.5;
		this.instructions.y = title.y + title.height;
		this.app.stage.addChild(this.instructions);

		const buttonWidth: number = 100;
		const buttonHeight: number = 20;
		const buttonMargin: number = 10;
		const instructionsMargin: number = 50;

		this.buttonDone = new Button(buttonWidth, buttonHeight);
		this.buttonDone.id = GameButtonId.DONE;
		this.buttonDone.setText(GameButtonId.DONE);
		this.buttonDone.clicked = this.onDoneClicked.bind(this);
		this.buttonDone.position.set(width * 0.5, this.instructions.y + this.instructions.height * 2);

		this.buttonRandom = new Button(buttonWidth, buttonHeight);
		this.buttonRandom.id = GameButtonId.RANDOM;
		this.buttonRandom.setText(GameButtonId.RANDOM);
		this.buttonRandom.clicked = this.onRandomClicked.bind(this);
		this.buttonRandom.position.set(width * 0.5, this.instructions.y + this.instructions.height * 2);
		this.app.stage.addChild(this.buttonRandom);

		this.buttonReset = new Button(buttonWidth, buttonHeight);
		this.buttonReset.id = GameButtonId.RESET;
		this.buttonReset.setText(GameButtonId.RESET);
		this.buttonReset.clicked = this.onResetClicked.bind(this);
		this.buttonReset.position.set(
			width * 0.5 - buttonWidth * 0.5 - buttonMargin,
			this.instructions.y + this.instructions.height * 2,
		);

		this.buttonRepeat = new Button(buttonWidth, buttonHeight);
		this.buttonRepeat.id = GameButtonId.REPEAT;
		this.buttonRepeat.setText(GameButtonId.REPEAT);
		this.buttonRepeat.clicked = this.onRepeatClicked.bind(this);
		this.buttonRepeat.position.set(
			width * 0.5 + buttonWidth * 0.5 + buttonMargin,
			this.instructions.y + this.instructions.height * 2,
		);

		this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);
		this.mapView.createStage(this.map);
		this.mapView.x = this.mapPaddingLeftRight * 0.5;
		this.mapView.y = this.instructions.y + this.instructions.height + instructionsMargin;
		this.app.stage.addChild(this.mapView);

		this.settingsMenu = new SettingsMenu(width - this.size, this.changeModeRepeat.bind(this));
		this.settingsMenu.x = (width - this.settingsMenu.width) * 0.5;
		this.settingsMenu.y = this.mapView.y + (this.mapRow + 1.5) * this.size;
		this.app.stage.addChild(this.settingsMenu);
	}

	public buildView(): void {
		this.app.stage.addChild(this.buttonDone);
		this.buttonRandom.reset();
		this.app.stage.removeChild(this.buttonRandom);
	}

	public removeButtonView(): void {
		this.buttonDone.reset();
		this.buttonRandom.reset();
		this.app.stage.removeChild(this.buttonDone);
		this.app.stage.removeChild(this.buttonRandom);
	}

	public resetView(): void {
		this.app.stage.addChild(this.buttonReset);
		this.app.stage.addChild(this.buttonRepeat);
	}

	public onResetClicked(): void {
		this.mapView.clearTimeoutList();
		this.gameStateManager.update();
		this.buttonDone.reset();
		this.buttonReset.reset();
		this.app.stage.removeChild(this.buttonDone);
		this.app.stage.removeChild(this.buttonReset);
		this.app.stage.removeChild(this.buttonRepeat);
		this.app.stage.addChild(this.buttonRandom);

		this.randomMode = false;
		this.generateMap();
	}

	public generateMap(): void {
		this.map = new MapModel(this.mapCol, this.mapRow, this.randomMode);
		this.mapView.setMap(this.map);
		let tile: Tile;
		this.map.get().forEach((elementRow, indexRow) => {
			elementRow.forEach((elementCol, indexCol) => {
				tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
				tile.type = elementCol;
				tile.setTypePos(elementCol);
				tile.update();
				if (this.randomMode) tile.disable();
				else tile.enable();
			});
		});
	}

	public changeModeRepeat(): void {
		if (this.gameStateManager.currentState.stateType === GameState.PATHEND) {
			this.onRepeatClicked();
		}
	}

	public onRepeatClicked(): void {
		this.mapView.clearTimeoutList();
		this.gameStateManager.update(GameStateUpdate.REPEAT);
		this.buttonDone.reset();
		this.buttonReset.reset();
		this.buttonRepeat.reset();
		this.app.stage.removeChild(this.buttonDone);
		this.app.stage.addChild(this.buttonReset);
		this.app.stage.addChild(this.buttonRepeat);
		let tile: Tile;
		this.map.get().forEach((elementRow, indexRow) => {
			elementRow.forEach((elementCol, indexCol) => {
				tile = this.mapView.tiles.get(`${indexCol}-${indexRow}`);
				tile.type = elementCol;
				tile.update();
				if (this.randomMode) tile.disable();
				else tile.enable();
			});
		});
	}

	public onDoneClicked(): void {
		this.gameStateManager.update();
		this.mapView.setState(this.gameStateManager);
	}

	public updateInstructions(value: string): void {
		this.instructions.text = value;
	}

	public onRandomClicked(): void {
		this.randomMode = true;
		this.generateMap();
		this.gameStateManager.update(GameStateUpdate.RANDOM);
	}

	public findPath(): void {
		let heuristic: Heuristic;
		let allowDiagonal: boolean = false;
		switch (this.settingsMenu.selectedMode) {
			case PathfindingType.MANHATTAN:
				heuristic = Heuristic.MANHATTAN;
				break;
			case PathfindingType.DIAGONAL:
				heuristic = Heuristic.DIAGONAL;
				break;
			case PathfindingType.ALLDIAGONALS:
				heuristic = Heuristic.DIAGONAL;
				allowDiagonal = true;
				break;
			default:
				heuristic = Heuristic.MANHATTAN;
		}

		this.pathFindingManager = new PathFinding({ heuristic, allowDiagonal });
		this.pathFindingManager
			.setWalkable({ type: TILE.GREEN }, { type: TILE.GRASS, weight: 1 })
			.setEnd(TILE.END)
			.setStart(TILE.START);
		const bestPath: { col: number; row: number }[] = this.pathFindingManager.find(this.map.get());
		if (bestPath.length > 0) {
			this.showNodes(bestPath);
			this.updateInstructions(
				'Heuristic: ' + this.settingsMenu.selectedMode.toUpperCase() + ', ' + (bestPath.length - 1) + ' moves.',
			);
		} else {
			this.updateInstructions(
				'Heuristic: ' + this.settingsMenu.selectedMode.toUpperCase() + '. Impossible to move!',
			);
		}
	}

	public showNodes(listPath: { col: number; row: number }[]): void {
		let nodeParent;
		listPath.forEach((node, index) => {
			nodeParent = listPath[index + 1];
			if (!nodeParent) return;
			this.mapView.highlightRectangule(index, node.row, node.col, nodeParent.row, nodeParent.col);
		});
	}
}
