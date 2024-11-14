import { Sprite, Texture } from "pixi.js";
import { cfg } from "./cfg";
import { getRandomUint } from "../utils/random";

const textureNames = [
    "bar", "bell", "cherry", "seven"
];

export class ReelSymbol extends Sprite {
    constructor() {
        super();

        this.applyRandomTexture();
    }

    public applyRandomTexture() {
        this.applyTextureById(getRandomUint(textureNames.length));
    }

    public applyTextureById(id: number) {
        const { symbolSize } = cfg;
        const textureName = textureNames[id];
        this.texture = Texture.from(textureName);
        this.scale.set(Math.min(symbolSize / this.texture.width, symbolSize / this.texture.height));
        this.x = Math.round((symbolSize - this.width) / 2);
    }
}
