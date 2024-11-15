import { Container, Texture, TilingSprite } from "pixi.js";
import { SpineBoy } from "../ui/SpineBoy";
import { SlotMachine } from "../game/SlotMachine";
import { SlotResult } from "../net/gameServer";
import { Settings } from "../game/Settings";
import gsap from "gsap";
import { bgm } from "../utils/audio";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _spineBoy: SpineBoy;
    private readonly _slotMachine: SlotMachine;
    private readonly _background: TilingSprite;
    private readonly _ground: TilingSprite;
    private readonly _settings: Settings;

    constructor() {
        super();

        this._background = new TilingSprite({
            texture: Texture.from('brick2'),
            width: 64,
            height: 64,
        });
        this.addChild(this._background);

        this._ground = new TilingSprite({
            texture: Texture.from('metal'),
            width: 64,
            height: 64,
        });
        this.addChild(this._ground);

        this._slotMachine = new SlotMachine();
        this._slotMachine.reels.onComplete.connect((res) => this.onSpinComplete(res));
        this.addChild(this._slotMachine);

        this._spineBoy = new SpineBoy();
        this.addChild(this._spineBoy);

        this._settings = new Settings();
        this.addChild(this._settings);

        bgm.play('game/bg_music.wav');
    }

    public resize(w: number, h: number) {
        this._slotMachine.x = (w - this._slotMachine.width) / 2;

        this._spineBoy.y = 626;
        this._spineBoy.x = w / 2 - 300;

        this._background.width = w;
        this._background.height = h;

        this._ground.y = this._slotMachine.height;
        this._ground.width = w;
        this._ground.height = h - this._slotMachine.height;

        this._settings.position.set(10, h - 10 - this._settings.height);
    }

    private onSpinComplete(res: SlotResult) {
        if (res.win) {
            this._spineBoy.playWin();
        } else {
            this._spineBoy.playLose();
        }
    }

    public async show() {
        gsap.killTweensOf(this);
        this.alpha = 0;
        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' });
    }
}