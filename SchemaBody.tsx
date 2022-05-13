/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./Schema.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SchemaBodyProps = {
  properties: Object;
}

type CodeStringProps = {
  description: string;
}

const Properities: React.FC<SchemaBodyProps> = ({ properties }) => {
    const names = properties ? Object.keys(properties) : [];

  const CodeString: React.FC<CodeStringProps> = ({ description }) => {
      const highlightCode = description.split(" ").map((desc, index) => {
          return (/`([^`]*)`/.test(desc)) ?
              <span
                  className={`${styles.schemaRole} ${styles.schemaCode}`}
                  key={index}
              >{`${desc.slice(1, desc.length - 1)}`}
              </span>
              : ` ${desc} `;
      });
      return (
          <div className={styles.schemaBodyDescription}>{highlightCode}</div>
      );
  }

  return (
      <div>{names && names.map((name, idx) => {
          const { type, description, pattern, enum: _enum } = properties[name];

          return (
              <div className={styles.schemaBodySignature} key={idx}>
                  <div className={styles.schemaBodyHeader}>
                      <p><strong>{name}</strong></p>
                      {_enum ? <div className={styles.schemaBodyType}>{type}
                          <div className={styles.enumFlex}>{_enum.map((el: string, i: number) => <div
                              className={`${styles.schemaType} ${styles.schemaCode} ${styles.schemaEnums}`}
                              key={i}>{el}</div>)}
                          </div>
                      </div> : null}
                      {pattern ? <div className={styles.schemaRegexContainer}>
                          <div className={styles.schemaPatternType}>{type}</div>
                          <div className={styles.schemaBodyPattern}>{pattern}</div>
                      </div> : null}
                  </div>
                  <CodeString description={description}/>
              </div>
          );
      })}

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
