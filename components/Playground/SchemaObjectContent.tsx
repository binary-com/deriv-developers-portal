import { useState } from 'react';
import RecursiveProperties from './RecursiveProperties';
import styles from "./Schema.module.scss";

export default function SchemaObjectContent({ key_value, properties }) {
    const [is_open_object, setIsOpenObject] = useState(false);
    const { type, description, items, title, pattern, enum: _enum } = properties[key_value];
    const object_toggle = is_open_object ? styles.objectOpen : "";
    const value = properties[key_value];
    const is_not_nested = type !== "object" ||
        type !== "array" ||
        items?.type !== "object" ||
        items?.type !== "array";

    return (
        <div>    
            <div className={styles.schemaObjectContent}>
                <div>
                    <p><strong>{key_value}</strong></p>
                </div>
                <div>
                    <button onClick={() => setIsOpenObject(!is_open_object)}>{title ? key_value : "object"}</button>
                </div>
            </div>
            <p className={`${styles.schemaBodyDescription} ${object_toggle}`}>{description}</p>
            <div className={`${type === "object" || type === "array" ? `${styles.schemaObjectBody}` : ''} ${object_toggle}`}>
                { is_not_nested &&
                <>
                    <p><strong>{key_value}</strong></p>
                    <p className={styles.schemaObjectDescription}>{description}</p>
                </>
                }
                <RecursiveProperties properties={value.properties || value?.items?.properties} value={value}/>
            </div>
        </div>
    )
}
