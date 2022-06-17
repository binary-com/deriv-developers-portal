import styles from "./Schema.module.scss";

type SchemaDescriptionTypes = {
  description: string;
};

const HighlightCode = ({ description }: any) => {
  const [first, code, ...rest] = description.split("`");
  return (
    <>
      {first}
      {code && (
        <span className={`${styles.schemaRole} ${styles.schemaCode}`}>
          {code}
        </span>
      )}
      {rest.length > 0 && <HighlightCode description={rest.join("`")} />}
    </>
  );
};

export default function SchemaDescription({
  description,
}: SchemaDescriptionTypes) {
  return (
    <span className={styles.schemaBodyDescription}>
      <HighlightCode description={description} />
    </span>
  );
}
