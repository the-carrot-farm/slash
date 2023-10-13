import {settingsService} from './registry.ts'
export class SlashApplication {
    constructor() {
        // @ts-ignore
        window.settings = settingsService
    }
}