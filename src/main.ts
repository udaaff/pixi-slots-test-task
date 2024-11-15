// import '@pixi/spine-pixi';

import { Application } from 'pixi.js';
import { initAssets } from './utils/assets';
import { navigation } from './utils/navigation';
import { PreloaderScreen } from './screens/PreloaderScreen';
import { sound } from '@pixi/sound';
import { GameScreen } from './screens/GameScreen';
import * as PIXI from "pixi.js";
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/all';

export const app = new Application();

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 375;
    const minHeight = 700;

    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    app.renderer.canvas.style.width = `${windowWidth}px`;
    app.renderer.canvas.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    app.renderer.resize(width, height);
    navigation.resize(width, height);
}

function onVisibilityChange() {
    if (document.hidden) {
        sound.pauseAll();
        navigation.blur();
    } else {
        sound.resumeAll();
        navigation.focus();
    }
}

async function init() {
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
    });
    document.body.appendChild(app.canvas);

    window.addEventListener('resize', resize);
    resize();

    document.addEventListener('visibilitychange', onVisibilityChange);

    await initAssets();
    await navigation.showScreen(PreloaderScreen);
    await navigation.showScreen(GameScreen);
}

init();