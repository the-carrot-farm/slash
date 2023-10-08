import {afterEach, describe, expect, it} from "vitest";
import {render, screen, cleanup} from '@testing-library/react'
import {Profile} from './profile.tsx'
import {settingsService} from './mock-registry.ts'
import '@testing-library/jest-dom/vitest'
import {mockReset, captor} from "vitest-mock-extended";
import {EntityEvent, EntityEventOperation} from "./entity/entity.service.ts";
import {Settings} from "./settings/settings.persistence.ts";

/**
 * @vitest-environment jsdom
 */
describe('Profile Component', async () => {
    afterEach(() => {
        mockReset(settingsService)
        cleanup()
    })
    it('should render the settings name', async () => {
        // given
        settingsService.get.mockResolvedValue({
            name: "name",
            area: "profile",
            data: "Dominic Scimeca"
        })

        // when
        render(<Profile settingsService={settingsService}/>)

        // then
        await screen.findByRole('name')

        expect(settingsService.get).toBeCalledWith("name", "profile")

        expect(screen.getByRole('name')).toHaveTextContent('Dominic Scimeca')
    })

    it('should render when name is updated', async () => {
        // given
        settingsService.get.mockResolvedValue(undefined)

        const settingsEvent : EntityEvent<Settings> = {
            operation: EntityEventOperation.save,
            timestamp: 1234,
            entity: {
                name: "name",
                area: "profile",
                data: "Bill Gates"
            },
        }

        // when
        render(<Profile settingsService={settingsService}/>)

        // then
        await screen.findByRole('top')

        const myCaptor = captor();

        expect(settingsService.subscribeToEntityEvents).toHaveBeenCalledWith(myCaptor);

        myCaptor.value(settingsEvent)

        await screen.findByRole('name')

        expect(screen.getByRole('name')).toHaveTextContent('Bill Gates')
    })
})