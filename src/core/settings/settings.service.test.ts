import {describe, it, expect, vi, afterEach} from "vitest";
import {indexedDBDatabase, settingsPersistence, timeService} from "../mock-registry.ts";
import {Settings} from "./settings.persistence.ts";
import {EntityEvent, EntityEventOperation} from "../entity/entity.service.ts";
import {SettingsService} from "./settings.service.ts";
import {mockReset} from "vitest-mock-extended";

const settingsService = new SettingsService(settingsPersistence, timeService)

describe('Settings Service', () => {
    afterEach(() => {
        mockReset(indexedDBDatabase)
    })

    it('should save and publish event', async () => {
        //given
        let subscriber = vi.fn()

        settingsService.subscribeToEntityEvents(subscriber)
        timeService.getNowMilliseconds.mockReturnValue(12345)
        settingsPersistence.save.mockResolvedValue("entityId")

        let settings : Settings = {name: "newTabDefault", area: "links", data: true}
        let settingEntityEventWrapper : EntityEvent<Settings> = {
            operation: EntityEventOperation.save,
            timestamp: 12345,
            entity: settings
        };


        //when
        const result = await settingsService.save(settings)

        //then
        expect(result).toEqual("entityId")

        expect(settingsPersistence.save).toBeCalledWith(settings)

        expect(subscriber).toBeCalledWith(settingEntityEventWrapper)
    });

    it('should get from persistence', async () => {
        //given
        const returnedResult : Settings = {
            name: "name",
            area: "area",
            data: []
        }
        settingsPersistence.get.mockResolvedValue(returnedResult)

        //when
        const result = await settingsService.get("name", "area")

        //then
        expect(settingsPersistence.get).toBeCalledWith("name", "area")
        expect(result).toEqual(returnedResult)
    });
})