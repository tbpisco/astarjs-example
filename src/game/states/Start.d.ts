import { GameStateManager } from './GameStateManager';
import { State } from './State';
export declare class Start implements State {
	instructions: string;
	stateType: string;
	gameStateManager: GameStateManager;
	constructor(state: GameStateManager);
	update(): void;
}
