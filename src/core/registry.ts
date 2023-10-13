import {SettingsPersistence} from "./settings/settings.persistence.ts";
import {IndexedDBDatabase} from "./IndexDB.service.ts";
import {SettingsService} from "./settings/settings.service.ts";
import {TimeService} from "./time/time.service.ts";


export const indexedDBDatabase = new IndexedDBDatabase()
export const timeService = new TimeService()
export const settingsPersistence = new SettingsPersistence(indexedDBDatabase)
export const settingsService = new SettingsService(settingsPersistence, timeService)