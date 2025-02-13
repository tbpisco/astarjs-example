import { GameState } from '../../global/interfaces';
import { GameStateManager } from './GameStateManager';
import { Start } from './Start';
import { State } from './State';

export class Build implements State {
	public instructions: string = 'Click DONE once you have finished adding elements to your map.';
	public stateType: GameState = GameState.BUILD;
	public gameStateManager: GameStateManager;

	constructor(state: GameStateManager) {
		this.gameStateManager = state;
		this.gameStateManager.controller.buildView();
	}

	public update(): void {
		this.gameStateManager.change(new Start(this.gameStateManager));
	}
}
