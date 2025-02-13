import { GameState, GameStateUpdate } from '../../global/interfaces';

export interface State {
	readonly instructions: string;
	readonly stateType: GameState;

	update(type?: GameStateUpdate): void;
}
