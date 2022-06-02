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
        const { type, description, default: defaultValue, pattern, examples, enum: _enum } = properties[key];
        // console.log(_enum);
        return (
            <div className={styles.schemaBodySignature} key={`${index}-signature`}>
                <div className={`${styles.schemaBodyHeader}${type === "object" ? ` ${styles.schemaObjectHeader}` : ''}`}>
                    <div className={styles.schemaBodyType}>
                        <div className={styles.enumFlex}>
                            <p><strong>{key}</strong></p>
                            { type && type !== "object" && typeof(type) !== 'object' && 
                                <span className={styles.enumType} style={type === "number" ? { color : "#8181cc" } : {}}>
                                    {type}
                                </span>
                            }
                            { type === "object" || type === "array" ?
                                <SchemaObjectContent
                                    properties={properties}
                                    key_value={key}
                                />
                            :
                                <></>
                            }
                            { _enum && 
                                <>
                                    <span className={styles.enumLabel}>
                                        { _enum.length > 1 ? "enum" : "constant" }
                                    </span> {' '}
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
                            {/* take examples and map it to div elements with class styles.defaultValue */}
                            { examples &&
                               examples.map((el: string, i: number) => {
                                   return (
                                        <div className={styles.defaultValue} key={i}>
                                            <span className={styles.defaultValueLabel}>example: </span>
                                            <span className={styles.schemaDefaultValue}>{el}</span>
                                        </div>
                                   )
                                })
                            }
                        </div>
                    </div>
                </div>
            { type && type !== "object" && type !== "array" && <CodeString description={description}/> }
            </div>
        );
    });
}
