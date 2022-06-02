/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./Schema.module.scss";
import RecursiveProperties from "./RecursiveProperties";
import CodeContent from "../CodeBlock/CodeContent";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SchemaBodyProps = {
  properties: Object;
}

const SourceButton = ({ is_code_open, setIsCodeOpen }: any) => {
  return (
      <div 
          onClick={() => setIsCodeOpen(!is_code_open)}
          className={styles.sourceButtonMain} title="Source">{'{'}{'}'}
      </div>
  )
}

const Properities: React.FC<SchemaBodyProps> = ({ properties }) => {
  const [ is_open_object, setIsOpenObject ] = React.useState(false);
  let data;
  try {
    data = JSON.stringify(properties, null, 2);
  } catch (_error) {
    data = "";
  }

  return (
      <div>
        <SourceButton is_code_open={is_open_object} setIsCodeOpen={setIsOpenObject} />
        { is_open_object && <CodeContent lang="json" data={data} /> }
        { !is_open_object && <RecursiveProperties is_open properties={properties} value={properties}/> }
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
