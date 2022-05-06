import CodeContent from "./CodeContent";
import CopyButton from "./CopyButton";

export default function CodeBlockSingleLanguage({ lang, content }) {
    return (
        <>
            <CopyButton content_to_copy={content} />
            <CodeContent lang={lang} data={content} />
        </>
    )
}
