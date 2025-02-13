import { AppController } from '../controllers/AppController';
import { State } from './State';
export declare class GameStateManager {
	currentState: State;
	private previousState;
	controller: AppController;
	constructor(controller: AppController);
	change(state: State): void;
	start(): void;
	update(type?: string): void;
}
