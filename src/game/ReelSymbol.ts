import { Container, Sprite, Texture } from "pixi.js";
import { cfg } from "./cfg";
import { getRandomUint } from "../utils/random";

const textureNames = [
    "bar", "bell", "cherry", "seven"
];

export class ReelSymbol extends Container {
    public idx = -1;
    private _image = new Sprite();

    constructor() {
        super();

        this.applyRandomTexture();
        this._image.anchor.set(0.5);
        this.addChild(this._image);
    }

    public get image() {
        return this._image;
    }

    public applyRandomTexture() {
        this.applyTextureById(getRandomUint(textureNames.length));
    }

    public applyTextureById(id: number) {
        const { symbolSize } = cfg;
        const textureName = textureNames[id];
        this._image.texture = Texture.from(textureName);
        // this._image.scale.set(Math.min(symbolSize / this._image.texture.width, symbolSize / this._image.texture.height));
        this._image.position.set(symbolSize / 2)
    }
}
