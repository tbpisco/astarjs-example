import * as PIXI from 'pixi.js';
import Texture = PIXI.Texture;
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import { CursorType, TILE } from '../../global/interfaces';

export class Tile extends Sprite {
	private size: number;
	private col: number;
	private row: number;
	public type: number;
	public typePos: number = 0;
	public availableTypes: number[] = [
		TILE.GREEN,
		TILE.GRASS,
		TILE.HOUSE,
		TILE.WATER,
		TILE.TREES,
		TILE.MOUNTAIN,
		TILE.MOUNTAIN_BROWN,
	];
	public background: Sprite;
	public element: Sprite;

	constructor(type: number, col: number, row: number, size: number) {
		super();

		this.col = col;
		this.row = row;
		this.size = size;
		this.type = type;

		this.setTypePos(this.type);

		this.background = new Sprite();
		this.background.anchor.set(0.5);
		this.background.texture = this.getTexture(TILE.GREEN);
		this.addChild(this.background);

		this.createDotBorder(type);

		this.element = new Sprite();
		this.element.anchor.set(0.5);
		this.element.texture = this.getTexture(TILE.GREEN);
		this.addChild(this.element);

		this.update();
	}

	public createDotBorder(type: TILE): void {
		if (
			type != TILE.BORDER_TOP_LEFT &&
			type != TILE.BORDER_MIDDLE_LEFT &&
			type != TILE.BORDER_BOTTOM_LEFT &&
			type != TILE.BORDER_TOP_MIDDLE &&
			type != TILE.BORDER_BOTTOM_MIDDLE &&
			type != TILE.BORDER_TOP_RIGHT &&
			type != TILE.BORDER_MIDDLE_RIGHT &&
			type != TILE.BORDER_BOTTOM_RIGHT
		) {
			const border = new Graphics();
			border.setFillStyle({ color: 0xffffff, alpha: 0.4 });
			const rectSize = 0.8;
			border.circle(-this.size * 0.5, -this.size * 0.5, rectSize);
			border.circle(this.size * 0.5, -this.size * 0.5, rectSize);
			border.circle(-this.size * 0.5, this.size * 0.5, rectSize);
			border.circle(this.size * 0.5, this.size * 0.5, rectSize);
			border.fill();
			this.addChild(border);
		}
	}

	public setTypePos(type: number): void {
		this.typePos = this.availableTypes.indexOf(type);
	}

	public getCol(): number {
		return this.col;
	}

	public getRow(): number {
		return this.row;
	}

	public disable(): void {
		this.interactive = false;
		this.cursor = CursorType.POINTER;
	}

	public enable(): void {
		this.interactive = true;
		this.cursor = CursorType.HAND;
	}

	public changeTileType(type?: number): void {
		if (type) {
			this.type = type;
		} else {
			this.typePos = (this.typePos + 1) % this.availableTypes.length;
			this.type = this.availableTypes[this.typePos];
		}
		this.update();
	}

	public update(): void {
		const background: TILE[] = [
			TILE.GREEN,
			TILE.GRASS,
			TILE.WATER,
			TILE.HOUSE,
			TILE.TREES,
			TILE.START,
			TILE.END,
			TILE.MOUNTAIN,
			TILE.MOUNTAIN_BROWN,
			TILE.TOP_RIGHT,
			TILE.TOP_LEFT,
			TILE.TOP,
			TILE.BOTTOM,
			TILE.RIGHT,
			TILE.LEFT,
			TILE.BOTTOM_LEFT,
			TILE.BOTTOM_RIGHT,
		];
		this.background.texture = this.getTexture(TILE.GREEN);
		this.background.visible = background.indexOf(this.type) !== -1;

		if (this.type === TILE.GREEN) {
			this.element.texture = new Texture();
		} else if (this.type === TILE.GRASS) {
			this.element.texture = new Texture();
			this.background.texture = this.getTexture(TILE.GRASS);
		} else {
			this.element.texture = this.getTexture(this.type);
		}
	}

	public highlight(direction: number): void {
		if (this.type == TILE.START || this.type == TILE.END) return;
		if (this.type == TILE.GRASS) {
			this.type = direction;
			this.update();
			this.background.visible = true;
			this.background.texture = this.getTexture(TILE.GRASS);
		} else {
			this.type = direction;
			this.update();
		}
	}

	public getTexture(type: number): Texture {
		return new Texture({ source: PIXI.Assets.get('tile-set'), frame: this.getFrameByType(type) });
	}

	public getFrameByType(type: number): Rectangle {
		switch (type) {
			case TILE.BOTTOM_LEFT:
				return new Rectangle(0 * this.size, 41 * this.size, this.size, this.size);
				break;
			case TILE.BOTTOM_RIGHT:
				return new Rectangle(1 * this.size, 41 * this.size, this.size, this.size);
				break;
			case TILE.LEFT:
				return new Rectangle(1 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.RIGHT:
				return new Rectangle(2 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.BOTTOM:
				return new Rectangle(3 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.TOP:
				return new Rectangle(4 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.TOP_LEFT:
				return new Rectangle(5 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.TOP_RIGHT:
				return new Rectangle(6 * this.size, 40 * this.size, this.size, this.size);
				break;
			case TILE.MOUNTAIN_BROWN:
				return new Rectangle(6 * this.size, 28 * this.size, this.size, this.size);
				break;
			case TILE.MOUNTAIN:
				return new Rectangle(6 * this.size, 3 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_BOTTOM_RIGHT:
				return new Rectangle(2 * this.size, 30 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_MIDDLE_RIGHT:
				return new Rectangle(2 * this.size, 29 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_TOP_RIGHT:
				return new Rectangle(2 * this.size, 28 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_BOTTOM_MIDDLE:
				return new Rectangle(1 * this.size, 30 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_TOP_MIDDLE:
				return new Rectangle(1 * this.size, 28 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_BOTTOM_LEFT:
				return new Rectangle(0 * this.size, 30 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_MIDDLE_LEFT:
				return new Rectangle(0 * this.size, 29 * this.size, this.size, this.size);
				break;
			case TILE.BORDER_TOP_LEFT:
				return new Rectangle(0 * this.size, 28 * this.size, this.size, this.size);
				break;
			case TILE.END:
				return new Rectangle(2 * this.size, 6 * this.size, this.size, this.size);
				break;
			case TILE.START:
				return new Rectangle(3 * this.size, 6 * this.size, this.size, this.size);
				break;
			case TILE.GREEN:
				return new Rectangle(this.size, 0, this.size, this.size);
				break;
			case TILE.GRASS:
				return new Rectangle(this.size * 3, 0, this.size, this.size);
				break;
			case TILE.WATER:
				return new Rectangle(4 * this.size, 2 * this.size, this.size, this.size);
				break;
			case TILE.HOUSE:
				return new Rectangle(2 * this.size, 1 * this.size, this.size, this.size);
				break;
			case TILE.TREES:
				return new Rectangle(5 * this.size, 0, this.size, this.size);
				break;
			default:
				return new Rectangle(0, 0, this.size, this.size);
				break;
		}
	}
}
