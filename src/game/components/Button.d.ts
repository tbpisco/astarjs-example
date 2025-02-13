import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;
import TextStyle = PIXI.TextStyle;
export default class Button extends Sprite {
	private _text;
	private _cb;
	private _id;
	private _selected;
	get id(): string;
	set id(id: string);
	constructor(x: number, y: number, width: number, height: number, selected?: boolean);
	create(x: number, y: number, width: number, height: number): void;
	setText(val: string, style?: TextStyle): void;
	private onDown;
	private onUp;
	private onHover;
	private onOut;
	get clicked(): () => void;
	set clicked(cb: () => void);
	reset(): void;
}
