import {Settings, SettingsPersistence} from "./settings.persistence.ts";
import {EntityEvent, EntityEventOperation} from "../entity/entity.service.ts";
import {TimeService} from "../time/time.service.ts";
import {TypedEvent} from "../event/event.ts";

export class SettingsService {

    private settingsEvents = new TypedEvent<EntityEvent<Settings>>()

    constructor(
        private settingsPersistence: SettingsPersistence,
        private timeService: TimeService,
    ) {}

    get = (name: string, area: string) : Promise<Settings | undefined> => {
        return this.settingsPersistence.get(name, area)
    }

    save = async (settings: Settings) : Promise<string> => {
        const result = await this.settingsPersistence.save(settings)

        this.settingsEvents.emit(this.createEntitySaveEvent(settings))

        return result
    }

    subscribeToEntityEvents = (subscriber: (subscriber: EntityEvent<Settings>) => void) => {
        return this.settingsEvents.on(subscriber)
    }

    private createEntitySaveEvent = (settings: Settings): EntityEvent<Settings> =>  {
        return {
            operation: EntityEventOperation.save,
            timestamp: this.timeService.getNowMilliseconds(),
            entity: settings
        }
    }
}