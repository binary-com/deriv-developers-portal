import { useState, useEffect } from 'react';
import RecursiveProperties from './RecursiveProperties';
import SchemaDescription from './SchemaDescription';
import CodeContent from "../CodeBlock/CodeContent";
import styles from "./Schema.module.scss";

// Header component

const SchemaBodyHeader = ({ key_value, type, defaultValue, pattern, examples, enum: _enum, title, is_open_object, setIsOpenObject }: any) => {
    let typeClassName;
    switch (type) {
        case "number": typeClassName = styles.number; break;
        case "array": typeClassName = styles.array; break;
        case "integer": typeClassName = styles.integer; break;
        default: typeClassName = styles.string; break;
    }
    if (Array.isArray(type)) {
        type.map((item) => {
            if (item !== "null") {
                switch (item) {
                    case "number": typeClassName = styles.number; break;
                    case "array": typeClassName = styles.array; break;
                    case "integer": typeClassName = styles.integer; break;
                    default: typeClassName = styles.string; break;
                }
            }
        });
    }

    const is_type_with_enumlabel = _enum && type && type !== "object" && typeof (type) !== 'object';
    const is_only_type = !_enum && type && type !== "object" && typeof (type) !== 'object';

    return (
        <div className={`${styles.schemaBodyHeader}${type === "object" ? ` ${styles.schemaObjectHeader}` : ''}`}>
                <div className={styles.schemaBodyType}>
                    <div className={styles.enumFlex}>
                        <p><strong>{key_value}</strong></p>
                        <div className={styles.enumContainer}>
                            { is_type_with_enumlabel &&
                                <>
                                    <span className={styles.enumLabel}>
                                        {_enum.length > 1 ? "enum" : "constant"}
                                    </span> {' '}

                                    <span className={`${styles.enumType} ${typeClassName}`}>
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
                            { is_only_type &&
                                <span className={`${styles.enumType} ${typeClassName}`}>
                                    {type}
                                </span>
                            }

                            { type && Array.isArray(type) && 
                                <>
                                    <span className={`${styles.enumType} ${typeClassName}`}>
                                        {type[0]}, {type[1]}
                                    </span>
                                </>
                            }

                            {type === "object" || type === "array" ?
                                <>
                                    <div className={styles.schemaObjectContent}>
                                        <div>
                                            <button onClick={() => setIsOpenObject(!is_open_object)}>{title ? key_value : "object"}</button>
                                        </div>
                                    </div>
                                </>
                                :
                                <></>
                            }
                            {pattern &&
                                <div className={styles.schemaRegexContainer}>
                                    <div className={styles.schemaBodyPattern}>{pattern}</div>
                                </div>
                            }
                            {typeof(defaultValue) !== 'undefined' &&
                                <div className={styles.defaultValue}>
                                    <span className={styles.defaultValueLabel}>default: </span>
                                    <span className={styles.schemaDefaultValue}>{defaultValue}</span>
                                </div>
                            }
                            {/* take examples and map it to div elements with class styles.defaultValue */}
                            {examples &&
                            <div className={styles.defaultValue}>
                                <span className={styles.defaultValueLabel}>example: </span>
                                {
                                    examples.map((el: string, i: number) => {
                                        return (
                                            <div key={i}>
                                                <span className={styles.schemaDefaultValue}>{el}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

const SourceButton = ({ is_code_open, setIsCodeOpen }: any) => {
    return (
        <div 
            onClick={() => setIsCodeOpen(!is_code_open)}
            className={styles.sourceButton} title="JSON">{'{'}{'}'}
        </div>
    )
}

export default function SchemaObjectContent({ key_value, properties }) {
    const [is_open_object, setIsOpenObject] = useState(false);
    const [is_code_open, setIsCodeOpen] = useState(false);
    const { type, description, default: defaultValue, pattern, examples, enum: _enum, title } = properties[key_value];
    const value = properties[key_value];
    let data;
    try {
      data = JSON.stringify(value, null, 2);
    } catch (_error) {
      data = "";
    }
    useEffect(() => {
        setIsCodeOpen(false);
        setIsOpenObject(false);
    }, [properties]);

    return (
        <div className={styles.schemaBodySignature} >
            <SourceButton is_code_open={is_code_open} setIsCodeOpen={setIsCodeOpen} />
            {/* Header */}
            <SchemaBodyHeader
                key_value={key_value}
                type={type}
                defaultValue={defaultValue}
                pattern={pattern}
                examples={examples}
                enum={_enum}
                title={title}
                is_open_object={is_open_object}
                setIsOpenObject={setIsOpenObject}
            />
            {/* Description */}
            <SchemaDescription
                description={description}
            />
            {/* RecursiveProperties */}
            { is_code_open && <CodeContent lang="json" data={data} /> }
            { !is_code_open && 
                <RecursiveProperties is_open={is_open_object} properties={value.properties || value?.items?.properties} value={value} />
            }
        </div>
    )
}
