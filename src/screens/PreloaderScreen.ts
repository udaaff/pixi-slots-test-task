import gsap from 'gsap';
import { Container } from 'pixi.js';

import { onLoadComplete, onLoadProgress } from '../utils/assets';
import { ProgressBar } from '@pixi/ui';

export class PreloaderScreen extends Container {
    public static assetBundles = ['preload'];

    private readonly _progressBar: ProgressBar;

    constructor() {
        super();

        this._progressBar = new ProgressBar({
            bg: 'ProgressBar_border',
            fill: 'ProgressBar_fill',
            fillPaddings: { top: 1, right: 1, left: 1, bottom: 1 }
        });
        this._progressBar.scale.set(6);
        this.addChild(this._progressBar);
    }

    private onProgress(_bundles: string[], progress: number) {
        console.log("onProgress", progress, _bundles);
        this._progressBar.progress = progress * 100;
    }

    private onComplete(_bundles: string[]) {
        console.log("onComplete", _bundles);
        this._progressBar.progress = 100;
    }

    public async show() {
        gsap.killTweensOf(this);
        onLoadProgress.connect((b, p) => this.onProgress(b, p));
        onLoadComplete.connect((b) => this.onComplete(b));

        this.alpha = 0;

        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' });
    }

    public async hide() {
        onLoadProgress.disconnect(this.onProgress);
        onLoadComplete.disconnect(this.onComplete);
        gsap.killTweensOf(this);
        await gsap.to(this, { alpha: 0, delay: 0.1, duration: 0.2, ease: 'linear' });
    }

    public resize(w: number, h: number) {
        this._progressBar.position.set(
            w / 2 - this._progressBar.width / 2,
            h / 2
        );
    }
}