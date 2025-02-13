import { GameStateManager } from './GameStateManager';
import { End } from './End';
import { State } from './State';
import { GameState } from '../../global/interfaces';

export class Start implements State {
	public instructions: string = 'Select start position';
	public stateType: GameState = GameState.START;
	public gameStateManager: GameStateManager;

	constructor(state: GameStateManager) {
		this.gameStateManager = state;
		this.gameStateManager.controller.removeButtonView();
	}

	public update(): void {
		this.gameStateManager.change(new End(this.gameStateManager));
	}
}
