import styles from "./Sidebar.module.scss"
import React from 'react'
import { Link} from '@tanstack/react-location'

const Sidebar = () => {
  return (
    <div id="sidebar" className={styles.sidebarleft}>
            <p className={styles.sidebartitle}>Deriv API</p>
            <div>
            <Link to="/docs/" >Quickstart</Link>
            <Link to="/docs/app-registration/">App registration</Link>
            <Link to="/api-explorer/">API explorer</Link>
            <Link to="/docs/api-guide/">API guide</Link>
            <Link to="/docs/faq/">FAQ</Link>
            <Link to="/docs/json-schemas/">JSON Schemas</Link>
            <Link to="/docs/bug-bounty/">Bug Bounty</Link>
            </div>
    </div>
  )
}

export default Sidebar