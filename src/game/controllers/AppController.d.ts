import { Instructions } from '../components/Instructions';
import Button from '../components/Button';
import { SettingsMenu } from '../components/SettingsMenu';
export declare class AppController {
	private size;
	private mapCol;
	private mapRow;
	private mapPaddingTopBottom;
	private mapPaddingLeftRight;
	private gameStateManager;
	private pathFindingManager;
	private mapView;
	private domElement;
	private app;
	private randomMode;
	private map;
	instructions: Instructions;
	buttonDone: Button;
	buttonRandom: Button;
	buttonReset: Button;
	settingsMenu: SettingsMenu;
	constructor();
	setup(): void;
	init(width: number, height: number): void;
	setupView(width: number, height: number): void;
	buildView(): void;
	removeButtonView(): void;
	resetView(): void;
	onResetClicked(): void;
	generateMap(): void;
	onDoneClicked(): void;
	updateInstructions(value: string): void;
	onRandomClicked(): void;
	findPath(): void;
	showNodes(
		listPath: {
			col: number;
			row: number;
		}[],
	): void;
}
