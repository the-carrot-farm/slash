import {SettingsPersistence} from "./settings.persistence.ts";
import {IndexedDBDatabase} from "./IndexDB.service.ts";


export const indexedDBDatabase = new IndexedDBDatabase()
export const settingsPersistence = new SettingsPersistence(indexedDBDatabase)