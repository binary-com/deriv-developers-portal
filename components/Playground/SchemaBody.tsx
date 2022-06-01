/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./Schema.module.scss";
import RecursiveProperties from "./RecursiveProperties";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SchemaBodyProps = {
  properties: Object;
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
