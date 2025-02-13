import { GameState, GameStateUpdate } from '../../global/interfaces';
import { GameStateManager } from './GameStateManager';
import { Initial } from './Initial';
import { State } from './State';

export class PathEnd implements State {
	public instructions: string = '';
	public stateType: GameState = GameState.PATHEND;
	public gameStateManager: GameStateManager;

	constructor(state: GameStateManager) {
		this.gameStateManager = state;
		this.gameStateManager.controller.findPath();
		this.gameStateManager.controller.resetView();
		this.gameStateManager.controller.removeButtonView();
	}

	public update(type: GameStateUpdate): void {
		if (type == GameStateUpdate.REPEAT) {
			this.gameStateManager.change(new PathEnd(this.gameStateManager));
		} else {
			this.gameStateManager.change(new Initial(this.gameStateManager));
		}
	}
}
