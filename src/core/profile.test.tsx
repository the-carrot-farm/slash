import {afterEach, describe, expect, it} from "vitest";
import {render, screen, cleanup} from '@testing-library/react'
import {Profile} from './profile.tsx'
import {settingsService} from './mock-registry.ts'
import '@testing-library/jest-dom/vitest'
import {mockReset, captor} from "vitest-mock-extended";
import {EntityEvent, EntityEventOperation} from "./entity/entity.service.ts";
import {Settings} from "./settings/settings.persistence.ts";
import {userEvent} from "@testing-library/user-event";

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
        await screen.findByText('Name: Dominic Scimeca')

        expect(settingsService.get).toBeCalledWith("name", "profile")
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
        await screen.findAllByText('')

        const myCaptor = captor();

        expect(settingsService.subscribeToEntityEvents).toHaveBeenCalledWith(myCaptor);

        myCaptor.value(settingsEvent)

        await screen.findByText('Name: Bill Gates')
    })

    it('should update name', async () => {
        //given
        settingsService.get.mockResolvedValue(undefined)
        const expectedSave : Settings = {
            name: "name",
            area: "profile",
            data: "Dominic"
        }
        const user = userEvent.setup()


        //when
        render(<Profile settingsService={settingsService}/>)

        const nameInput = screen.getByRole('textbox')
        const submitButton = screen.getByRole('button')

        await user.type(nameInput, "Dominic")
        await user.click(submitButton)

        //then
        expect(settingsService.save).toHaveBeenCalledWith(expectedSave)
    });
})