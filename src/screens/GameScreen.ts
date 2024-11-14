import { Container, Graphics } from "pixi.js";
import { cfg } from "../game/cfg";
import { Goblin } from "../ui/Goblin";
import { SlotMachine } from "../game/SlotMachine";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _bottom: Graphics;
    private readonly _goblin: Goblin;
    private readonly _slotMachine: SlotMachine;

    constructor() {
        super();

        this._slotMachine = new SlotMachine();
        this.addChild(this._slotMachine);

        this._bottom = new Graphics();
        this.addChild(this._bottom);

        this._goblin = new Goblin();
        this.addChild(this._goblin);

        this._bottom.eventMode = "static";
        this._bottom.cursor = "pointer";
        this._bottom.addListener("pointerdown", () => this.startPlay())
    }

    private startPlay() {
        this._slotMachine.spin();
    }

    public resize(w: number, h: number) {
        const { symbolSize, reelWidth, numReels } = cfg;
        const margin = (h - symbolSize * 3) / 2;

        this._slotMachine.x = (w - this._slotMachine.width) / 2;

        this._goblin.y = h / 2;
        this._goblin.x = this._slotMachine.x - this._goblin.width;

        this._bottom.clear();
        this._bottom.rect(0, margin + symbolSize * 4 + 50, w, 50);
        this._bottom.fill(0x00FF00);
    }
}