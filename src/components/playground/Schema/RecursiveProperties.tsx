import SchemaDescription from "./SchemaDescription";
import SchemaObjectContent from "./SchemaObjectContent";
import styles from "./Schema.module.scss";
import React from "react";

export default function RecursiveProperties({
  is_open,
  properties,
  value,
}: {
  is_open: boolean;
  properties: any;
  value: any;
}): any {
  const keys = properties && Object.keys(properties);
  if (!is_open) {
    return null;
  }
  if (!keys) {
    return (
      <>
        <SchemaDescription description={value.description} />
      </>
    );
  }
  return keys?.map((key, index) => {
    return (
      <React.Fragment key={key}>
        {index === 0 && value?.items?.description && (
          <SchemaDescription description={value.items.description} />
        )}
        <SchemaObjectContent
          key={key}
          key_value={key}
          properties={properties}
        />
      </React.Fragment>
    );
  });
}
