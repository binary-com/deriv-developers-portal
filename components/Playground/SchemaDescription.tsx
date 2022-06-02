import styles from "./Schema.module.scss";

type SchemaDescriptionTypes = {
    description: string;
}

export default function SchemaDescription ({ description }: SchemaDescriptionTypes) {
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
