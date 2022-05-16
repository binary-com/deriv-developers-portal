import React from 'react'
import { Link } from 'react-router-dom'

const Sidepanel = () => {
  return (
    <div>
        <ul>
            <p>Deriv API</p>
            <li><Link to="/">Quickstart</Link></li>
            <li><Link to="docs/app-registration">App registration</Link></li>
            <li><Link to="api-explorer">API explorer</Link></li>
            <li><Link to="docs/api-guide">API guide</Link></li>
            <li><Link to="docs/FAQ">FAQ</Link></li>
            <li><Link to="docs/Json">JSON Schemas</Link></li>
            <li><Link to="docs/bug-bounty">Bug Bounty</Link></li>
        </ul>
    </div>
  )
}

export default Sidepanel
