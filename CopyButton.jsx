import React from "react"
import styles from "./Quickstart.module.scss"

const CopyButton = ({content_to_copy,className = "copy_button"}) => {
  const fallbackCopyTextToClipboard = () => {
    const dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.value = content_to_copy
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
  }
  const handleCopyButtonClick = () => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard()
      return
    }
    navigator.clipboard.writeText(content_to_copy)
  }
  return (
    <div
      data-testid="copyButton"
      className={styles[`${className}`]}
      onClick={handleCopyButtonClick}
    >
      <div
        className={styles.copy_button_image}
        alt="copy code icon"
      />
      <div className={styles.copy_button_text}> Copy </div>
    </div>
  )
}

export default CopyButton