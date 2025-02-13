import Button from './Button';
import * as PIXI from 'pixi.js';
import Container = PIXI.Container;
export declare class SettingsMenu extends Container {
	manhattanBtn: Button;
	diagonalBtn: Button;
	diagonalFreeBtn: Button;
	selectedMode: string;
	constructor();
	onClicked(btn: Button): void;
}
