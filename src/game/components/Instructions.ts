import * as PIXI from 'pixi.js';
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;

export class Instructions extends Text {
	constructor(text: string, width: number) {
		const style = new TextStyle({
			fontFamily: 'FuturaHandwritten',
			fontSize: 16,
			fontWeight: 'bold',
			fill: 0x000,
			wordWrap: true,
			align: 'center',
			wordWrapWidth: width,
		});

		super({ text, style });
		this.anchor.set(0.5);
	}
}
