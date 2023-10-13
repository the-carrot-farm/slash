import {IndexedDBDatabase} from "./IndexDB.service.ts";
import { mockDeep, mock } from 'vitest-mock-extended';
import {SettingsPersistence} from "./settings/settings.persistence.ts";
import {TimeService} from "./time/time.service.ts";
import {SettingsService} from "./settings/settings.service.ts";

export const indexedDBDatabase  = mockDeep<IndexedDBDatabase>()
export const settingsPersistence = mockDeep<SettingsPersistence>()
export const settingsService = mock<SettingsService>()
export const timeService = mockDeep<TimeService>()