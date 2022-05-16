import styles from './MobilePageSelect.module.scss';
import { useNavigate, useLocation } from 'react-router-dom'

export default function MobilePageSelect() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const onSelectChange = (event) => {
        const selectedPage = event.target.value;
        if (selectedPage) {
            navigate({ to: selectedPage, replace: true })
        }
    };
    return (
        <select className={styles.mobilePageSelect} onChange={onSelectChange} value={currentPath}>
            <option value="/docs/">Quickstart</option>
            <option value="/docs/app-registration/">App Registration</option>
            <option value="/playground/">API Playground</option>
            <option value="/docs/api-guide/">API Guide</option>
            <option value="/docs/faq/">FAQ</option>
            <option value="/docs/json-schemas/">JSON Schemas</option>
            <option value="/docs/bug-bounty/">Bug Bounty</option>
        </select>
    )
}
