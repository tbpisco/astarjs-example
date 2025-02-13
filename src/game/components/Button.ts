import * as PIXI from 'pixi.js';
import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import { CursorType } from '../../global/interfaces';

export default class Button extends Sprite {
	private _text: Text;

	private _cb: () => void = () => {};
	private _id: string = '';
	private _selected: boolean = false;
	private _buttonBackground: Graphics;

	public get id(): string {
		return this._id;
	}

	public set id(id: string) {
		this._id = id;
	}

	constructor(width: number, height: number, selected: boolean = false) {
		super();
		this._selected = selected;
		this._text = new Text({
			text: '',
			style: {
				fontFamily: 'FuturaHandwritten',
				fontSize: 16,
				fill: 0xffffff,
				wordWrap: true,
				align: 'center',
				wordWrapWidth: width,
			},
		});
		this._text.anchor.set(0.5);
		this.addChild(this._text);
		this.create(width, height);
	}

	public create(width: number, height: number): void {
		this._buttonBackground = new Graphics();
		this._buttonBackground.roundRect(-width * 0.5, -height * 0.5, width, height, height / 5);
		this._buttonBackground.fill(0xffffff);
		this.addChildAt(this._buttonBackground, 0);

		this.changeColour(this._selected);
		this.anchor.set(0.5);

		this.interactive = true;
		this.cursor = CursorType.HAND;

		this.on(
			'mousedown',
			() => {
				this.onDown();
			},
			this,
		);

		this.on(
			'mouseup',
			() => {
				this.onUp();
			},
			this,
		);

		this.on(
			'mouseover',
			() => {
				if (this._selected) return;
				this.onHover();
			},
			this,
		);

		this.on(
			'mouseout',
			() => {
				if (this._selected) return;
				this.onOut();
			},
			this,
		);
	}

	public setText(val: string, style?: TextStyle): void {
		this._text.text = val;
		if (style) this._text.style = style;
	}

	private onDown(): void {
		this.changeColour(true);
		this._selected = true;
	}

	private onUp(): void {
		if (typeof this._cb === 'function') {
			this._cb();
		}
	}

	private onHover(): void {
		this.changeColour(true);
	}

	private onOut(): void {
		this.changeColour(false);
	}

	private changeColour(active: boolean): void {
		if (active) {
			this._buttonBackground.tint = 0x000000;
			this._text.tint = 0xffffff;
		} else {
			this._buttonBackground.tint = 0xffffff;
			this._text.tint = 0x000000;
		}
	}

	public get clicked() {
		return this._cb;
	}

	public set clicked(cb: () => void) {
		this._cb = cb;
	}

	public reset(): void {
		this._selected = false;
		this.changeColour(false);
	}
}
