import { BlurFilter, Container } from "pixi.js";
import { ReelSymbol } from "./ReelSymbol";
import { cfg } from "./cfg";

export class Reel extends Container {
    private readonly _symbols: ReelSymbol[] = [];
    private readonly _blur: BlurFilter;
    public pos = 0;
    public prevPos = 0;

    constructor() {
        super();

        for (let i = 0; i < cfg.numSymbols; ++i) {
            const symbol = new ReelSymbol();
            symbol.y = i * cfg.symbolSize;
            this._symbols.push(symbol);
            this.addChild(symbol);
        }

        this._blur = new BlurFilter();
        this._blur.blurX = 0;
        this._blur.blurY = 0;
        this.filters = [this._blur];
    }

    public get symbols() {
        return this._symbols;
    }

    public get blur() {
        return this._blur;
    }
}