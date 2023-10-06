import {settingsPersistence} from './registry.ts'
export class SlashApplication {
    constructor() {
        // @ts-ignore
        window.settings = settingsPersistence
    }
}