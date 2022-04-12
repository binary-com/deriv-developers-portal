import React from "react"
import styles from "./Faq.module.scss"

const AccordionItem = ({ children, title }) => {
  const [is_content_visible, setContentVisible] = React.useState(false)
  const togglePanel = () => {
    setContentVisible(!is_content_visible)
  }
  return (
    <div className={styles.accordionWrapper}>
      <div
        data-testid="accordionHeader"
        className={styles.accordionHeader}
        onClick={togglePanel}
      >
        <div className={styles.accordionText}>{title}</div>
        <div
          className={
            is_content_visible
              ? styles.accordionButtonMinus
              : styles.accordionButtonPlus
          }
          alt="expand"
        />
      </div>
      {is_content_visible && (
        <div className={styles.accordionPanel}>{children}</div>
      )}
    </div>
  )
}

export default AccordionItem
