import {IndexedDBDatabase} from "./IndexDB.service.ts";
import {vi} from "vitest";

// @ts-ignore
globalThis.jest = vi

import {mockDeep, mock, MockProxy, DeepMockProxy} from 'jest-mock-extended';

export const indexedDBDatabase : DeepMockProxy<IndexedDBDatabase> = mockDeep<IndexedDBDatabase>()
