import { GameState } from '../../global/interfaces';
import { GameStateManager } from './GameStateManager';
import { State } from './State';
export declare class PathEnd implements State {
	instructions: string;
	stateType: GameState;
	gameStateManager: GameStateManager;
	constructor(state: GameStateManager);
	update(): void;
}
