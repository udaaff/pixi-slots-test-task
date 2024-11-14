import { Container } from "pixi.js";
import { Goblin } from "../ui/Goblin";
import { SlotMachine } from "../game/SlotMachine";
import { SlotResult } from "../net/gameServer";
import { Sound } from "@pixi/sound";
import { bgm } from "../utils/audio";

export class GameScreen extends Container {
    public static assetBundles = ["game"];

    private readonly _goblin: Goblin;
    private readonly _slotMachine: SlotMachine;

    constructor() {
        super();

        this._slotMachine = new SlotMachine();
        this._slotMachine.reels.onComplete.connect((res) => this.onSpeenComplete(res));
        this.addChild(this._slotMachine);

        this._goblin = new Goblin();
        this.addChild(this._goblin);

        // console.log(Sound.from("bg_music.wav"));
        // bgm.play('game/bg-music.wav');

    }

    public resize(w: number, h: number) {
        this._slotMachine.x = (w - this._slotMachine.width) / 2;

        this._goblin.y = 520;
        this._goblin.x = 460;
    }

    private onSpeenComplete(res: SlotResult) {
        if (res.win) {
            this._goblin.playWin();
        } else {
            this._goblin.playLose();
        }
    }
}