import gsap from 'gsap';
import { Container, Sprite, Texture, Ticker, TilingSprite } from 'pixi.js';

import { cfg } from '../game/cfg';

export class LoadScreen extends Container {
    public static assetBundles = ['preload'];

    private readonly _background: TilingSprite;
    private readonly _spinner: Sprite;

    constructor() {
        super();

        this._background = new TilingSprite({
            texture: Texture.from('background-tile'),
            width: 64,
            height: 64,
            tileScale: {
                x: cfg.backgroundTileScale,
                y: cfg.backgroundTileScale,
            },
        });
        this.addChild(this._background);

        this._spinner = Sprite.from('loading-circle');
        this._spinner.anchor.set(0.5);
        this.addChild(this._spinner);
    }

    public async show() {
        gsap.killTweensOf(this);

        this.alpha = 0;

        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' });
    }

    public async hide() {
        gsap.killTweensOf(this);
        await gsap.to(this, { alpha: 0, delay: 0.1, duration: 0.2, ease: 'linear' });
    }

    public update(time: Ticker) {
        const delta = time.deltaTime;
        this._spinner.rotation -= delta / 60;
    }

    public resize(w: number, h: number) {
        this._background.width = w;
        this._background.height = h;
        this._spinner.x = w * 0.5;
        this._spinner.y = h * 0.5;
    }
}