import { Container } from "pixi.js";
import { Reel } from "./Reel";
import { cfg } from "./cfg";
import gsap from "gsap";
import { mockServerRequest, SlotResult } from "../net/gameServer";
import { Signal } from "typed-signals";
import { getRandomUint } from "../utils/random";
import { sfx } from "../utils/audio";

export class Reels extends Container {
    private readonly _reels: Reel[] = [];
    private _running = false;
    public readonly onComplete = new Signal<(res: SlotResult) => void>();

    constructor() {
        super();

        for (let i = 0; i < cfg.numReels; ++i) {
            const reel = new Reel();
            reel.x = i * cfg.reelWidth;
            this._reels.push(reel);
            this.addChild(reel);
        }
    }

    public async spin() {
        if (this._running)
            return;

        this._running = true;

        sfx.play("game/charge.wav");

        const result = await mockServerRequest();

        for (let i = 0; i < this._reels.length; ++i) {
            const reel = this._reels[i];
            const extra = i + getRandomUint(2);
            const target = reel.pos + 30 + i * 5 + extra;
            const duration = (500 + i * 300 + extra * 300) / 1000;

            gsap.to(reel, {
                pos: target, duration, ease: "back.out(0.5)",
                onUpdate: () => this.onUpdate(result.reels[i], target - 3),
                onComplete: i === this._reels.length - 1
                    ? () => this.reelsComplete(result)
                    : () => sfx.play("game/reel_finish.wav"),
            });
        }
    }

    public onUpdate(finalReel: number[], resultPos: number) {
        const { symbolSize } = cfg;
        for (let i = 0; i < this._reels.length; ++i) {
            const reel = this._reels[i];

            reel.blur.blurY = (reel.pos - reel.prevPos) * 20;
            reel.prevPos = reel.pos;

            for (let j = 0; j < reel.symbols.length; ++j) {
                const symbol = reel.symbols[j];
                const prevY = symbol.y;

                symbol.y = ((reel.pos + j) % reel.symbols.length) * symbolSize - symbolSize;
                if (symbol.y < 0 && prevY > symbolSize) {
                    const symbolIdx = Math.floor(reel.pos - resultPos);
                    if (symbolIdx < 0 || symbolIdx >= cfg.numSymbols)
                        symbol.applyRandomTexture();
                    else
                        symbol.applyTextureById(finalReel[symbolIdx]);
                }
            }
        }
    }

    private reelsComplete(result: SlotResult) {
        this._running = false;
        this.onComplete.emit(result);
        if (result.win)
            sfx.play("game/win.wav");
        else
            sfx.play("game/reel_finish.wav");
    }
}