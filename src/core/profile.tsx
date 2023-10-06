import {SettingsPersistence} from "./settings.persistence.ts";
import {useState, useEffect} from "react";

export const Profile = ({ settingsPersistence }: { settingsPersistence: SettingsPersistence }) => {
    const [name, setName] = useState("")

    useEffect(() => {
        settingsPersistence.get("name","profile")
            .then(settings => setName(settings?.data))
    }, []);

    const nameContent = name ? (<div role={"name"}>Name: {name}</div>) : null

    return (<div>{nameContent}</div>)
}