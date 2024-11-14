import { Spine } from "@pixi/spine-pixi";
import { Container } from "pixi.js";

const skins = ['goblin', 'goblingirl'];
const attachments = ['spear', 'dagger', null];
const animations = ['walk', 'idle'];

export class Goblin extends Container {
    private readonly _spine: Spine;
    constructor() {
        super();

        this._spine = Spine.from({
            skeleton: 'goblins.json',
            atlas: 'goblins.atlas',
        });
        this._spine.autoUpdate = true;
        this._spine.skeleton.setSkinByName('goblingirl');
        this._spine.state.setAnimation(0, 'idle', true);
        this.addChild(this._spine);
    }
}