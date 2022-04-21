import CodeContent from "./CodeContent";
import CopyButton from "./CopyButton";
import styles from "./CodeBlockSingleLanguage.module.scss";

export default function CodeBlockSingleLanguage({ lang, content }) {
    return (
        <div className={styles.codeBlockSingleLanguage }>
            <CopyButton content_to_copy={content} />
            <CodeContent lang={lang} data={content} />
        </div>
    )
}
