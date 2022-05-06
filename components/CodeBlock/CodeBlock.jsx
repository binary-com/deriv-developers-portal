import React, { useState, useEffect } from "react"
import CodeContent from "./CodeContent"
import CopyButton from './CopyButton'
import styles from "./CodeBlock.module.scss"

const CodeBlock = ({ id }) => {
  const [file_content, setFileContent] = useState(" ")
  const [lang, setLang] = useState("javascript")

  useEffect(() => {
    const file_extension = {
      javascript: "js",
      csharp: "cs",
      php: "php",
      python: "py"
    }
    const file_ext = file_extension[`${lang}`]
    const file_path = `/demos/demos/${id}-${lang}.${file_ext}`
    fetch(file_path)
      .then(response => response.text())
      .then(data => {
        const formatted_code = data
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
        setFileContent(formatted_code)
      })
  }, [id, lang])

  return (
    <div className={styles.codeBlock}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.cardTitle}>
            <select
              id="demo-buy-contract"
              value={lang}
              onChange={event => setLang(event.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
            </select>
          </p>
          <CopyButton size="16" content_to_copy={file_content} />
        </div>
        <CodeContent lang={lang} data={file_content} />
      </div>
    </div>
  )
}

export default CodeBlock
