import React from "react"
import styles from "./CopyButton.module.scss"

const CopyButton = ({ content_to_copy }) => {
  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(content_to_copy)
  }
  return (
    <div className={styles.copyButtonHeader}>
      <div
        data-testid="copyButton"
        className={styles.copyButton}
        onClick={handleCopyButtonClick}
      >
        <div
          className={styles.copyButtonImage}
          alt="copy code icon"
        />
        <div>Copy</div>
      </div>
    </div>
  )
}

export default CopyButton
