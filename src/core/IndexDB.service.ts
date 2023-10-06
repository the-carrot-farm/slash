import Dexie from 'dexie';
import {SettingsIndexDB} from "./settings.persistence.ts";

export class IndexedDBDatabase extends Dexie {

    settings!: Dexie.Table<SettingsIndexDB, string>;

    constructor () {
        super("Slash");
        this
            .version(1)
            .stores({
                settings: '++id, name, area, data',
            });
    }

    get = () => {
        return "adsf"
    }
}

