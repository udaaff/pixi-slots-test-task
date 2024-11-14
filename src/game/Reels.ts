import { Container } from "pixi.js";
import { Reel } from "./Reel";
import { cfg } from "./cfg";
import gsap from "gsap";
import { mockServerRequest } from "../net/gameServer";

export class Reels extends Container {
    private readonly _reels: Reel[] = [];
    private _running = false;

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

        const result = await mockServerRequest();
        console.log(result);

        for (let i = 0; i < this._reels.length; ++i) {
            const reel = this._reels[i];
            const extra = 0 //getRandomUint(3);
            const target = reel.pos + 30 + i * 5 + extra;
            console.log("target: ", target)
            const duration = (1500 + i * 1200 + extra * 600) / 1000;

            gsap.to(reel, {
                pos: target, duration, ease: "back.out(0.5)",
                onUpdate: () => this.onUpdate(result.reels[i], target - 3),
                onComplete: i === this._reels.length - 1
                    ? () => this.reelsComplete() : undefined,
            });
        }
    }

    public onUpdate(finalReel: number[], resultPos: number) {
        const { symbolSize } = cfg;
        for (let i = 0; i < this._reels.length; ++i) {
            const reel = this._reels[i];

            reel.blur.strengthY = (reel.pos - reel.prevPos) * 20;
            reel.prevPos = reel.pos;

            for (let j = 0; j < reel.symbols.length; ++j) {
                const symbol = reel.symbols[j];
                const prevY = symbol.y;

                symbol.y = ((reel.pos + j) % reel.symbols.length) * symbolSize - symbolSize;
                if (symbol.y < 0 && prevY > symbolSize) {
                    const symbolIdx = Math.floor(reel.pos - resultPos);
                    console.log(symbolIdx)
                    if (symbolIdx < 0)
                        symbol.applyRandomTexture();
                    else
                        symbol.applyTextureById(finalReel[symbolIdx]);
                }
            }
        }
    }

    private reelsComplete() {
        this._running = false;
    }
}