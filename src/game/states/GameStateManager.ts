import { GameStateUpdate } from '../../global/interfaces';
import { AppController } from '../controllers/AppController';
import { Initial } from './Initial';
import { State } from './State';

export class GameStateManager {
	public currentState: State = new Initial(this);
	private previousState: State[] = [];
	public controller: AppController;

	constructor(controller: AppController) {
		this.controller = controller;
	}

	public change(state: State): void {
		this.previousState.push(this.currentState);
		this.currentState = state;
		if (this.currentState.instructions !== '') this.controller.updateInstructions(this.currentState.instructions);
	}

	public start(): void {
		this.currentState.update();
	}

	public update(type?: GameStateUpdate): void {
		this.currentState.update(type);
	}
}
