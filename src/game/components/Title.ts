import * as PIXI from 'pixi.js';
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;

export class Title extends Text {
	constructor(text: string, width: number) {
		const style = new TextStyle({
			fontFamily: 'FuturaHandwritten',
			fontSize: 36,
			fontWeight: 'bold',
			fill: 0xebc231,
			dropShadow: {
				alpha: 1,
				angle: Math.PI * 0.25,
				blur: 1,
				color: 0x396a8d,
				distance: 3,
			},
			wordWrap: true,
			align: 'center',
			wordWrapWidth: width,
		});
		super({ text, style });
		this.anchor.set(0.5);
	}
}
