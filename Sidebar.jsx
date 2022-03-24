import styles from "./Sidebar.module.scss"
import React from 'react'
import { Link} from '@tanstack/react-location'

const Sidebar = () => {
  return (
    <div id="sidebar" className={styles.sidebarleft}>
            <p className={styles.sidebartitle}>Deriv API</p>
            <div>
            <Link to="quickstart" >Quickstart</Link>
            <Link to="app-registration">App registration</Link>
            <Link to="api-explorer">API explorer</Link>
            <Link to="api-guide">API guide</Link>
            <Link to="FAQ">FAQ</Link>
            <Link to="JSON">JSON Schemas</Link>
            <Link to="bug-bounty">Bug Bounty</Link>
            </div>
    </div>
  )
}

export default Sidebar