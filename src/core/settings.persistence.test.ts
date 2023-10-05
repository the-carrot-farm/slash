import {expect, describe, it, afterEach} from 'vitest'
import {Settings, SettingsPersistence} from "./settings.persistence.ts";
import {indexedDBDatabase} from "./mock-registry.ts";
import {mockReset} from "jest-mock-extended";

export const settingsPersistence = new SettingsPersistence(indexedDBDatabase)
describe('Settings Persistence', () => {
    afterEach(() => {
        mockReset(indexedDBDatabase);
    })
    it('should save settings and generate id', async () => {
        //given
        let settings : Settings = { name: "name", area: "profile", data: "Dominic Scimeca" };
        let savedSettings = { id: "name::profile", name: "name", area: "profile", data: "Dominic Scimeca" };

        indexedDBDatabase.settings.put.mockReturnValue("id2")

        //when
        const result = await settingsPersistence.save(settings)

        //then
        expect(indexedDBDatabase.settings.put).toBeCalledWith(savedSettings)
        expect(result).toEqual("id2")
    })

    it('should get by name and area', async () => {
        //given
        let savedSettings = { id: "name::profile", name: "name", area: "profile", data: "Dominic Scimeca" };

        indexedDBDatabase.settings.get.mockResolvedValue(savedSettings)

        //when
        const result = await settingsPersistence.get("name", "profile")

        //then
        expect(indexedDBDatabase.settings.get).toBeCalledWith("name::profile")
        expect(result).toEqual(savedSettings)
    });
})