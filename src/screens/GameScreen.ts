import { Container } from "pixi.js";
import { Goblin } from "../ui/Goblin";
import { SlotMachine } from "../game/SlotMachine";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _goblin: Goblin;
    private readonly _slotMachine: SlotMachine;

    constructor() {
        super();

        this._slotMachine = new SlotMachine();
        this.addChild(this._slotMachine);

        this._goblin = new Goblin();
        this.addChild(this._goblin);
    }

    public resize(w: number, h: number) {
        this._slotMachine.x = (w - this._slotMachine.width) / 2;

        this._goblin.y = h / 2;
        this._goblin.x = this._slotMachine.x - this._goblin.width;
    }
}