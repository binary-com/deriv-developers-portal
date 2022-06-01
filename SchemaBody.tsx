/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./Schema.module.scss";
import SchemaObjectContent from "./SchemaObjectContent";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SchemaBodyProps = {
  properties: Object;
}

type CodeStringProps = {
  description: string;
}

const Properities: React.FC<SchemaBodyProps> = ({ properties }) => {
  return (
      <div>
        <RecursiveProperties properties={properties} value={properties}/>
      </div>
  )
};

const SchemaBody: React.FC<SchemaBodyProps> = ({ properties }) => {
  return (
      <div className={styles.schemaBody}>
          <Properities properties={properties}/>
      </div>
  );
}

export default SchemaBody;

const CodeString: React.FC<CodeStringProps> = ({ description }) => {
    const highlightCode = description?.split(" ").map((desc, index) => {
      const regex = /`([a-zA-Z_]*[a-zA-Z]_?)`/g;
        return (regex.test(desc)) ?
            <div key={`${index}-code`}>
            <span
                className={`${styles.schemaRole} ${styles.schemaCode}`}
            >{desc.split("`")[1]}
            </span>
            <span>{desc.split("`")[2]}</span>
              </div>
            : ` ${desc} `;
    });
    return (
        <div className={styles.schemaBodyDescription}>{highlightCode}</div>
    );
}

const RecursiveProperties = ( { properties, value } : { properties: any, value: any }): any => {
    const keys = properties && Object.keys(properties);
    if (!keys) {
        return <>
            <CodeString description={value.description}/>
            { value.description }
        </>
    }
    return keys?.map((key, index) => {
        const { type, items, description, pattern, enum: _enum } = properties[key];
        // const nested_keys = items?.properties ? Object.keys(items);
        // const {  } = items[nested_keys];
        return (
            <div className={styles.schemaBodySignature} key={`${index}-signature`}>
                <div className={`${styles.schemaBodyHeader}${type === "object" ? ` ${styles.schemaObjectHeader}` : ''}`}>
                    { type === "object" ?
                        <SchemaObjectContent
                            RecursiveProperties={RecursiveProperties}
                            properties={properties}
                            key_value={key}
                        />
                        :
                        <p><strong>{key}</strong></p>
                    }
                    {/* { type === "array" &&
                        <SchemaObjectContent
                            RecursiveProperties={RecursiveProperties}
                            properties={items.properties}
                            key_value={key}
                        />
                    } */}
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
            { type !== "object" && <CodeString description={description}/> }
            </div>
        );
    });
}


