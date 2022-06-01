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
        const { type, description, default: defaultValue, pattern, enum: _enum } = properties[key];
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
                    <div className={styles.schemaBodyType} style={_enum || defaultValue || pattern ? { display : "flex" } : { display : "none" }}>
                        <div className={styles.enumFlex}>
                            { _enum && 
                                <>
                                    <span className={styles.enumLabel}>
                                        { _enum.length > 1 ? "enum" : "constant" }
                                    </span> {' '}
                                    <span className={styles.enumType} style={type === "number" ? { color : "#8181cc" } : {}}>
                                        {type}
                                    </span>
                                    <>{_enum.map((el: string, i: number) => 
                                        <div
                                            className={`${styles.schemaCode} ${styles.schemaEnums}`}
                                            key={i}
                                        >
                                            {el}
                                        </div>)}
                                    </>
                                </> 
                            }
                            { pattern && 
                                <div className={styles.schemaRegexContainer}>
                                    <div className={styles.schemaPatternType}>{type}</div>
                                    <div className={styles.schemaBodyPattern}>{pattern}</div>
                                </div>
                            }
                            { defaultValue &&
                                <div className={styles.defaultValue}>
                                    <span className={styles.defaultValueLabel}>default: </span>
                                    <span className={styles.schemaDefaultValue}>{defaultValue}</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            { type !== "object" && type !== "array" && <CodeString description={description}/> }
            </div>
        );
    });
}
