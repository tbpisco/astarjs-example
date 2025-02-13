import { AppController } from './game/controllers/AppController';

window.onload = () => {
	window.initGame();
};

window.initGame = () => {
	const game: AppController = new AppController();
	game.init();
};
