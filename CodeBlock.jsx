import React, { useState, useEffect } from "react"
import CodeContent from "./CodeContent"
import styles from "./Quickstart.module.scss"

const CodeBlock = ({ id, title, desc, subdesc }) => {
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
      <h2 className={styles.codeBlockTitle}>{title}</h2>
      <p className={styles.codeBlockDesc}>{desc}</p>
      {subdesc && <p className={styles.codeBlockDesc}>{subdesc}</p>}
      <div className={styles.card}>
        <div className={styles.card_header}>
          <p className={styles.card_header_title}>
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
          {/* <CopyButton size="16" content_to_copy={file_content} /> */}
        </div>
        <CodeContent lang={lang} data={file_content} />
      </div>
    </div>
  )
}

export default CodeBlock
