/* eslint-disable no-import-assign */
import styles from "./SelectRequestInput.module.scss";
import { useState,useEffect,useRef } from "react";
import { playground_requests } from "./Playground_Requests";

const SelectRequestInput = ({
  selected,
  setSelected,
  handleChange,
  selected_value,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
    }
};

useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
}, []);

  return (
    <fieldset>
      <div className={styles.dropdown}>
        <div
          className={styles.dropdownBtn}
          ref= {ref}
          onClick={() => {
            setIsActive(!isActive);
            setToggle(!toggle);
          }}
          data-testid="apiDropdown"
        >
          {selected_value}
          <span className={`${styles.arrow} ${isActive ? styles.down : ""}`} />
        </div>
        {isActive && (
          <div
            className={`${styles.dropdownContent} ${toggle ? styles.show : ""}`}
          >
            <input
              type="text"
              id="myInput"
              className={styles.dropdownSearch}
              onChange={(event) => setSearchResults(event.target.value)}
            />
            <div className={styles.dropdownSelect}>
              {" "}
              Select API Call - Version 3
            </div>
            <div className={styles.dropdownStart}>ALL CALLS</div>
            {playground_requests
              .filter((option) => {
                if (
                  option.title
                    .toLowerCase()
                    .includes(searchResults.toLowerCase())
                ) {
                  return option;
                  // eslint-disable-next-line no-else-return
                } else {
                  return;
                }
              })
              .map((option) => (
                <div
                  key={option.name}
                  value={option.title}
                  onClick={(e) => {
                    setSelected(option.title);
                    setIsActive(false);
                    handleChange(e, option.name);
                  }}
                  className={`${styles.dropdownItem}  ${
                    selected === option.title ? styles.dropdownSelected : ""
                  }`}
                  data-testid={`apiDropdownItem${option.name}`}
                >
                  {option.title}
                </div>
              ))}
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default SelectRequestInput;
