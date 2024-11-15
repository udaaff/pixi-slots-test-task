import { Container, Texture, TilingSprite } from "pixi.js";
import { Goblin } from "../ui/Goblin";
import { SlotMachine } from "../game/SlotMachine";
import { SlotResult } from "../net/gameServer";
import { Sound } from "@pixi/sound";
import { bgm } from "../utils/audio";
import { cfg } from "../game/cfg";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _goblin: Goblin;
    private readonly _slotMachine: SlotMachine;
    private readonly _background: TilingSprite;

    constructor() {
        super();

        this._background = new TilingSprite({
            texture: Texture.from('brick2'),
            width: 64,
            height: 64,
            tileScale: {
                x: cfg.backgroundTileScale,
                y: cfg.backgroundTileScale,
            },
        });
        this.addChild(this._background);

        this._slotMachine = new SlotMachine();
        this._slotMachine.reels.onComplete.connect((res) => this.onSpeenComplete(res));
        this.addChild(this._slotMachine);

        this._goblin = new Goblin();
        this.addChild(this._goblin);
    }

    public resize(w: number, h: number) {
        this._slotMachine.x = (w - this._slotMachine.width) / 2;

        this._goblin.y = 622;
        this._goblin.x = w / 2 - 300;

        this._background.width = w;
        this._background.height = h;
    }

    private onSpeenComplete(res: SlotResult) {
        if (res.win) {
            this._goblin.playWin();
        } else {
            this._goblin.playLose();
        }
    }
}