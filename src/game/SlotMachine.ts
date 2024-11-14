import { Container, Sprite } from "pixi.js";
import { Reels } from "./Reels";
import { Button, FancyButton } from "@pixi/ui";

const REELS_TOP_MARGIN = 200;
const REELS_LEFT_MARGIN = 5;

export class SlotMachine extends Container {
    private readonly _reels: Reels;

    constructor() {
        super();

        const glass = Sprite.from("reels");
        const fg = Sprite.from("fg");

        this._reels = new Reels();
        this._reels.position.set(
            REELS_LEFT_MARGIN + (fg.width - this._reels.width) / 2,
            REELS_TOP_MARGIN
        );

        const playButton = new FancyButton({
            pressedView: Sprite.from("button_down"),
            defaultView: Sprite.from("button_up")
        })
        playButton.onPress.connect(() => this.spin());
        this.addChild(glass, this._reels, fg, playButton);
    }

    private spin() {
        this._reels.spin();
    }
}