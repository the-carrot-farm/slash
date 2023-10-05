import {IndexedDBDatabase} from "./IndexDB.service.ts";
import * as R from 'ramda'

export interface Settings {
    name: string
    area: string
    data: any
}

export interface SettingsIndexDB extends Settings{
    id: string
}

export class SettingsPersistence {

    constructor(private indexedDBDatabase: IndexedDBDatabase) {}

    get = (name: string, area: string) : Promise<Settings | undefined> => {
        let id = this.generateId(name, area);

        return this.indexedDBDatabase.settings.get(id)
    }

    save = (settings: Settings) : Promise<string> => {
        let id = this.generateId(settings.name, settings.area)
        let settingsWithId = R.mergeLeft({id: id}, settings)

        return this.indexedDBDatabase.settings.put(settingsWithId)
    }

    private generateId = (name: string, area: string) : string => {
        return `${name}::${area}`
    }
}