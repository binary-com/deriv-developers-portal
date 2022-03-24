import styles from "./Sidebar.module.scss"
import React from 'react'
import { Link} from '@tanstack/react-location'

const Sidebar = () => {
  return (
    <div id="sidebar" className={styles.sidebarleft}>
            <p className={styles.sidebartitle}>Deriv API</p>
            <div>
            <Link to="quickstart" >Quickstart</Link>
            <Link to="app_registration">App registration</Link>
            <Link to="api_explorer">API explorer</Link>
            <Link to="api_guide">API guide</Link>
            <Link to="FAQ">FAQ</Link>
            <Link to="JSON">JSON Schemas</Link>
            <Link to="bug_bounty">Bug Bounty</Link>
            </div>
    </div>
  )
}

export default Sidebar