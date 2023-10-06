import {IndexedDBDatabase} from "./IndexDB.service.ts";
import { mockDeep } from 'vitest-mock-extended';
import {SettingsPersistence} from "./settings.persistence.ts";

export const indexedDBDatabase  = mockDeep<IndexedDBDatabase>()
export const settingsPersistence = mockDeep<SettingsPersistence>()