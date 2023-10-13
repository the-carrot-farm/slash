import React, {FormEventHandler} from "react";
import {useForm, SubmitHandler, FieldValues, Path, RegisterOptions} from "react-hook-form"

type InputProps<T> = {
    name: Path<T>
    required?: boolean
    maxLength?: number
    minLength?: number
    max?: number
    min?: number
    pattern?: RegExp
    validate?: Function | Object
    disabled?: boolean
}

type InputPropsReactHookForm<T extends FieldValues> = InputProps<T> & RegisterOptions<T, Path<T>>

interface ContentProps<T extends FieldValues> {
    Submit: () => React.ReactNode
    Text: (props: InputPropsReactHookForm<T>) => React.ReactNode
}
interface FormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>,
    content: (props: ContentProps<T>) => React.ReactNode
}

const FormComponent = ({children, onSubmit} : {children?: React.ReactNode, onSubmit: FormEventHandler}) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}

const Submit = () => {
    return (
        <input type="submit" />
    )
}

export const Form = <T extends FieldValues>({onSubmit, content} : FormProps<T>) =>  {
    const {
        register,
        handleSubmit ,
        formState: { errors }
    } = useForm<T>()

    const Text = (props: InputPropsReactHookForm<T>) => {
        return (
            <div>
                <input type="text" {...register(props.name, props)} />
                {errors[props.name] && errors[props.name]?.type === 'required' && <span>this field is required</span>}
            </div>
        )
    }

    return (
        <FormComponent onSubmit={handleSubmit(onSubmit)}>
            {content({Submit, Text})}
        </FormComponent>
    )


    //
    // const Toggle = (props: InputProps) => {
    //     const labelComponent = props.label ? <label>{props.label}</label> : null
    //
    //     return (
    //         <div>
    //             {labelComponent}
    //             <input type="checkbox" {...register(props.name, props)} />
    //             {errors[props.name] && errors[props.name]?.type === 'required' && <span>this field is required</span>}
    //         </div>
    //     )
    // }
    //
}



