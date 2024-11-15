import { Spine } from "@pixi/spine-pixi";
import { Container } from "pixi.js";
import { getRandomUint } from "../utils/random";

const winAnims = ['hoverboard', 'shoot', 'portal', 'jump'];

export class Goblin extends Container {
    private readonly _spine: Spine;
    private _curAnim = "idle";

    constructor() {
        super();

        this._spine = Spine.from({
            skeleton: 'spineboy-pro.json',
            atlas: 'spineboy-pma.atlas',
            scale: 0.3,
        });
        this._spine.state.setAnimation(0, 'idle', true);
        this.addChild(this._spine);
    }

    public playLose() {
        if (this._curAnim === 'death')
            return;
        this._curAnim = 'death';
        this._spine.state.setAnimation(0, 'death');
    }

    public playWin() {
        if (this._curAnim === 'idle') {
            this._spine.state.setAnimation(0, 'shoot');
            this._spine.state.addAnimation(0, 'idle');
            return;
        }
        this._curAnim = 'idle';
        this._spine.state.setAnimation(0, winAnims[getRandomUint(4)]);
        this._spine.state.addAnimation(0, 'idle', true);
    }
}