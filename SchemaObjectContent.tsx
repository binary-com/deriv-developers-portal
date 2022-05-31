import { useState } from 'react';
import styles from "./Schema.module.scss";

export default function SchemaObjectContent({RecursiveProperties, key_value, properties}) {
    const [is_open_object, setIsOpenObject] = useState(false);
    const { type, description, title, pattern, enum: _enum } = properties[key_value];
    const object_toggle = is_open_object ? styles.objectOpen : '';
    const value = properties[key_value];
    console.log(properties);
    return (
        <div>
            <div className={styles.schemaObjectContent}>
                <div>
                    <p><strong>{key_value}</strong></p>
                </div>
                <div>
                    <button onClick={(event) => {
                        setIsOpenObject(!is_open_object)
                        console.dir(event.target.parentElement.parentElement.parentElement);
                    }}>{title ? key_value : "object"}</button>
                </div>
            </div>
            <p className={styles.schemaBodyDescription}>{description}</p>
            <div className={`${type === "object" ? `${styles.schemaObjectBody}` : ''} ${object_toggle}`}>
                <p><strong>{key_value}</strong></p>
                <p className={styles.schemaObjectDescription}>{description}</p>
                <RecursiveProperties properties={value.properties} value={key_value}/>
            </div>
        </div>
    )
}