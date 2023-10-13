import {useState, useEffect} from "react";
import {SettingsService} from "./settings/settings.service.ts";
import {Form} from "./form/form.tsx";


interface FormOutput {
    name: string
}
export const Profile = ({ settingsService }: { settingsService: SettingsService }) => {
    const [name, setName] = useState(undefined)

    useEffect(() => {
        settingsService.subscribeToEntityEvents(settingsEvent =>
            setName(settingsEvent.entity.data)
        )

        settingsService.get("name","profile")
            .then(settings => setName(settings?.data))
    }, [settingsService]);

    const nameContent = name ? (<div>Name: {name}</div>) : null

    const saveName = ({name} : {name: string}) => {
        settingsService.save({
            name: "name",
            area: "profile",
            data: name
        })
    }

    const formContent = (
        <Form<FormOutput>
            onSubmit={saveName}
            content={({Text, Submit}) => (<>
                <Text name="name" required={true}/>
                <Submit/>
            </>)}
        />
    )

    return (<div>
        {nameContent}
        {formContent}
    </div>)
}