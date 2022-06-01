import CodeString from './CodeString';
import SchemaObjectContent from './SchemaObjectContent';
import styles from "./Schema.module.scss";

export default function RecursiveProperties ( { properties, value } : { properties: any, value: any }): any {
    const keys = properties && Object.keys(properties);
    if (!keys) {
        return <>
            <CodeString description={value.description}/>
        </>
    }
    return keys?.map((key, index) => {
        const { type, description, pattern, enum: _enum } = properties[key];
        return (
            <div className={styles.schemaBodySignature} key={`${index}-signature`}>
                <div className={`${styles.schemaBodyHeader}${type === "object" ? ` ${styles.schemaObjectHeader}` : ''}`}>
                    { type === "object" || type === "array" ?
                        <SchemaObjectContent
                            properties={properties}
                            key_value={key}
                        />
                        :
                        <p><strong>{key}</strong></p>
                    }
                    { _enum && 
                        <div className={styles.schemaBodyType}>
                            {type}
                            <div className={styles.enumFlex}>{_enum.map((el: string, i: number) => 
                                <div
                                    className={`${styles.schemaType} ${styles.schemaCode} ${styles.schemaEnums}`}
                                    key={i}
                                >
                                    {el}
                                </div>)}
                            </div>
                        </div> 
                    }
                    { pattern && 
                        <div className={styles.schemaRegexContainer}>
                            <div className={styles.schemaPatternType}>{type}</div>
                            <div className={styles.schemaBodyPattern}>{pattern}</div>
                        </div>
                    }
                </div>
            { type !== "object" && type !== "array" && <CodeString description={description}/> }
            </div>
        );
    });
}
