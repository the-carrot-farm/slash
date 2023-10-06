import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react'
import {Profile} from './profile.tsx'
import {settingsPersistence} from './mock-registry.ts'
import '@testing-library/jest-dom/vitest'

/**
 * @vitest-environment jsdom
 */
describe('Profile Component', async () => {
    it('should render the settings name', async () => {
        // given
        settingsPersistence.get.mockResolvedValue({
            name: "name",
            area: "profile",
            data: "Dominic Scimeca"
        })

        // when
        render(<Profile settingsPersistence={settingsPersistence}/>)

        // then
        await screen.findByRole('name')

        expect(settingsPersistence.get).toBeCalledWith("name", "profile")

        expect(screen.getByRole('name')).toHaveTextContent('Dominic Scimeca')
    })
})