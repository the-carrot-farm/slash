import {useState, useEffect} from "react";
import {SettingsService} from "./settings/settings.service.ts";

export const Profile = ({ settingsService }: { settingsService: SettingsService }) => {
    const [name, setName] = useState(undefined)

    useEffect(() => {
        settingsService.subscribeToEntityEvents(settingsEvent =>
            setName(settingsEvent.entity.data)
        )

        settingsService.get("name","profile")
            .then(settings => setName(settings?.data))
    }, []);

    const nameContent = name ? (<div role='name'>Name: {name}</div>) : null

    return (<div role='top'>{nameContent}</div>)
}