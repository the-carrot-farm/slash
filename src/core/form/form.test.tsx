import {afterEach, describe, expect, it, vi} from "vitest";
import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { userEvent } from "@testing-library/user-event";
import {Form} from "./form.tsx";
import {any} from "vitest-mock-extended";


/**
 * @vitest-environment jsdom
 */
describe('Form Components', async () => {
    afterEach(() => {
        cleanup()
    })
    it('should create an empty form', async () => {
        //given
        interface FormFields {}

        const onSubmit = vi.fn()
        const user = userEvent.setup()

        //when
        render(
            <Form<FormFields>
                onSubmit={onSubmit}
                content={({Submit}) => {
                    return (<>
                        <Submit/>
                    </>)
                }}
            />
        )

        const submitButton = screen.getByRole('button')
        await user.click(submitButton)

        //then
        expect(onSubmit).toBeCalledWith({}, any())
    });
    it('should send input value', async () => {
        //given
        interface FormFields {
            searchTerm : string
        }

        const onSubmit = vi.fn()
        const user = userEvent.setup()
        const expectedSubmission : FormFields = {
            searchTerm: "github"
        }

        //when
        render(
            <Form<FormFields>
                onSubmit={onSubmit}
                content={({Submit, Text}) => {
                    return (<>
                        <Text name='searchTerm'/>
                        <Submit/>
                    </>)
                }}
            />
        )

        const submitButton = screen.getByRole('button')
        const input = screen.getByRole('textbox')

        await user.type(input, 'github')
        await user.click(submitButton)

        //then
        expect(onSubmit).toBeCalledWith(expectedSubmission, any())
    })
    it('should show errors on required fields', async () => {
        //given
        interface FormFields {
            searchTerm : string
        }

        const onSubmit = vi.fn()
        const user = userEvent.setup()

        //when
        render(
            <Form<FormFields>
                onSubmit={onSubmit}
                content={({Submit, Text}) => {
                    return (<>
                        <Text name='searchTerm' required/>
                        <Submit/>
                    </>)
                }}
            />
        )

        const submitButton = screen.getByRole('button')

        await user.click(submitButton)

        const error = screen.getByText('this field is required')

        //then
        expect(onSubmit).not.toBeCalled()
        expect(error).toBeInTheDocument()
    })
})