import styles from "./MobilePageSelect.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobilePageSelect() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const onSelectChange = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage) {
      navigate(selectedPage);
    }
  };
  return (
    <select
      className={styles.mobilePageSelect}
      onChange={onSelectChange}
      value={currentPath}
    >
      <option value="/docs/">Quickstart</option>
      <option value="/app-registration/">App Registration</option>
      <option value="/api-explorer/">API Explorer</option>
      <option value="/docs/resources/api-guide/">API Guide</option>
      <option value="/docs/resources/faq/">FAQ</option>
      <option value="/docs/resources/json-schemas/">JSON Schemas</option>
      <option value="/docs/resources/bug-bounty/">Bug Bounty</option>
    </select>
  );
}
