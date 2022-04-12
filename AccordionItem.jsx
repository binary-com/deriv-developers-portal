import React from "react"
import styles from "./Faq.module.scss"

const AccordionItem = ({ children, title }) => {
  const [is_content_visible, setContentVisible] = React.useState(false)
  const togglePanel = () => {
    setContentVisible(!is_content_visible)
  }
  return (
    <div className={styles["accordion-wrapper"]}>
      <div
        data-testid="accordion-header"
        className={styles["accordion-header"]}
        onClick={togglePanel}
      >
        <div className={styles["accordion-text bold"]}>{title}</div>
        <div
          className={
            is_content_visible
              ? styles["accordion-button--minus"]
              : styles["accordion-button--plus"]
          }
          alt="expand"
        />
      </div>
      {is_content_visible && (
        <div className={styles["accordion-panel"]}>{children}</div>
      )}
    </div>
  )
}

export default AccordionItem
