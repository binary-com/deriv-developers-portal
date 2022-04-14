import React from "react"
import styles from "./Faq.module.scss"

const Accordion = ({ children }) => {
  return <div className={styles.accordion}>{children}</div>
}

export default Accordion
