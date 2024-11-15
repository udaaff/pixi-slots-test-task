import { Switcher } from "@pixi/ui";
import { Container } from "pixi.js";
import { userSettings } from "../utils/userSettings";

export class Settings extends Container {
    constructor() {
        super();

        const volume = userSettings.getMasterVolume() > 0 ? 1 : 0;
        userSettings.setMasterVolume(volume);

        const soundBtn = new Switcher(['sound_off', 'sound_on']);
        soundBtn.innerView.cursor = "pointer";
        soundBtn.forceSwitch(volume);
        soundBtn.onChange.connect((v) => userSettings.setMasterVolume(Number(v)))
        this.addChild(soundBtn);
    }
}