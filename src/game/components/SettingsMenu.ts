import Button from './Button';
import * as PIXI from 'pixi.js';
import Container = PIXI.Container;
import { GameButtonId, PathfindingType } from '../../global/interfaces';

export class SettingsMenu extends Container {
	public manhattanBtn: Button;
	public diagonalBtn: Button;
	public diagonalFreeBtn: Button;
	private _changeMode: () => void;

	private _selectedMode: PathfindingType = PathfindingType.MANHATTAN;

	public get selectedMode(): PathfindingType {
		return this._selectedMode;
	}

	public set selectedMode(value: PathfindingType) {
		this._selectedMode = value;
		this._changeMode();
	}

	constructor(width: number, changeMode: () => void) {
		super();

		this._changeMode = changeMode;

		const menuWidth: number = width;
		const height: number = 20;
		const margin: number = 40;
		width = (menuWidth - margin * 2) / 3;

		this.manhattanBtn = new Button(width, height, true);
		this.manhattanBtn.setText(PathfindingType.MANHATTAN);
		this.manhattanBtn.id = GameButtonId.MANHATTAN;
		this.manhattanBtn.clicked = this.onClicked.bind(this, this.manhattanBtn);
		this.manhattanBtn.position.set(width * 0.5, 0);

		this.diagonalBtn = new Button(width, height);
		this.diagonalBtn.setText(PathfindingType.DIAGONAL);
		this.diagonalBtn.id = GameButtonId.DIAGONAL;
		this.diagonalBtn.clicked = this.onClicked.bind(this, this.diagonalBtn);
		this.diagonalBtn.position.set(this.manhattanBtn.x + width + margin, 0);

		this.diagonalFreeBtn = new Button(width, height);
		this.diagonalFreeBtn.setText(PathfindingType.ALLDIAGONALS);
		this.diagonalFreeBtn.id = GameButtonId.ALLDIAGONALS;
		this.diagonalFreeBtn.clicked = this.onClicked.bind(this, this.diagonalFreeBtn);
		this.diagonalFreeBtn.position.set(this.diagonalBtn.x + width + margin, 0);

		this.addChild(this.manhattanBtn);
		this.addChild(this.diagonalBtn);
		this.addChild(this.diagonalFreeBtn);
	}

	public onClicked(btn: Button): void {
		switch (btn.id) {
			case GameButtonId.MANHATTAN:
				this.selectedMode = PathfindingType.MANHATTAN;
				this.diagonalBtn.reset();
				this.diagonalFreeBtn.reset();
				break;
			case GameButtonId.DIAGONAL:
				this.selectedMode = PathfindingType.DIAGONAL;
				this.manhattanBtn.reset();
				this.diagonalFreeBtn.reset();
				break;
			case GameButtonId.ALLDIAGONALS:
				this.selectedMode = PathfindingType.ALLDIAGONALS;
				this.diagonalBtn.reset();
				this.manhattanBtn.reset();
				break;
			default:
				this.selectedMode = PathfindingType.MANHATTAN;
				this.diagonalBtn.reset();
				this.diagonalFreeBtn.reset();
		}
	}
}
