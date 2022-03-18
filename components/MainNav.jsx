import { Link } from '@tanstack/react-location';
import styles from './mainNav.module.css';

export default function MainNav () {
    return (
    <div className={styles.mainNav}>
        <div className="top-nav">
        </div>
        <header id="app" className="header">
            <div className='header-container'>
                <Link to="/">Home</Link>
                <Link to="docs">Documentation</Link>
                <Link to="api_explorer">API Explorer</Link>
            </div>
        </header>
    </div>
    );
}