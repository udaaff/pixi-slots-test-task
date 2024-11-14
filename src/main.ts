// import '@pixi/spine-pixi';

import { Application } from 'pixi.js';
import { initAssets } from './utils/assets';
import { navigation } from './utils/navigation';
import { LoadScreen } from './screens/LoadScreen';
import { sound } from '@pixi/sound';
import { GameScreen } from './screens/GameScreen';
import { bgm } from './utils/audio';

export const app = new Application();

let hasInteracted = false;


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

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
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

    // Prepare for user interaction, and play the music on event
    document.addEventListener('pointerdown', () => {
        if (!hasInteracted) {
            // Only play audio if it hasn't already been played
            bgm.play('game/bg_music.wav');
        }

        hasInteracted = true;
    });

    document.addEventListener('visibilitychange', onVisibilityChange);

    await initAssets();
    await navigation.showScreen(LoadScreen);
    console.log("load GameScreen")
    await navigation.showScreen(GameScreen);
}

init();