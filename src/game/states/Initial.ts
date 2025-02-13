import { GameStateManager } from './GameStateManager';
import { Build } from './Build';
import { PathEnd } from './PathEnd';
import { State } from './State';
import { GameState, GameStateUpdate } from '../../global/interfaces';

export class Initial implements State {
	public instructions: string = 'To create your own map CLICK on the SQUARES or switch to RANDOM mode.';
	public stateType: GameState = GameState.INITIAL;
	public gameStateManager: GameStateManager;

	constructor(state: GameStateManager) {
		this.gameStateManager = state;
	}

	public update(type: GameStateUpdate): void {
		if (type == GameStateUpdate.RANDOM) {
			this.gameStateManager.change(new PathEnd(this.gameStateManager));
		} else {
			this.gameStateManager.change(new Build(this.gameStateManager));
		}
	}
}
