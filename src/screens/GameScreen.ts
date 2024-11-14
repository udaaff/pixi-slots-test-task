import { Container, Graphics, Sprite } from "pixi.js";
import { Reels } from "../game/Reels";
import { cfg } from "../game/cfg";
import { Goblin } from "../ui/Goblin";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _reels: Reels;
    private readonly _top: Graphics;
    private readonly _bottom: Graphics;
    private readonly _goblin: Goblin;
    private readonly _fg: Sprite;


    constructor() {
        super();

        this._reels = new Reels();
        this.addChild(this._reels);

        this._top = new Graphics();
        this.addChild(this._top);
        this._bottom = new Graphics();
        this.addChild(this._bottom);

        this._goblin = new Goblin();
        this.addChild(this._goblin);

        this._fg = Sprite.from('fg');
        this.addChild(this._fg);

        this._bottom.eventMode = "static";
        this._bottom.cursor = "pointer";
        this._bottom.addListener("pointerdown", () => this.startPlay())
    }

    private startPlay() {
        this._reels.spin();
    }

    public resize(w: number, h: number) {
        const { symbolSize, reelWidth, numReels } = cfg;
        const margin = (h - symbolSize * 3) / 2;

        this._reels.y = margin;
        this._reels.x = Math.round((w - reelWidth * numReels) / 2);

        this._goblin.y = h / 2;
        this._goblin.x = this._reels.x - this._goblin.width;

        this._top.clear();
        this._top.rect(0, 0, w, margin);
        this._top.fill(0xFF0000);

        this._bottom.clear();
        this._bottom.rect(0, margin + symbolSize * 3, w, margin);
        this._bottom.fill(0x00FF00);
    }
}