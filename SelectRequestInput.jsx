import styles from "./SelectRequestInput.module.scss";
import {  useState } from "react";
import { playground_requests } from "./Playground_Requests";

const SelectRequestInput = ({ selected, setSelected, handleChange }) => {
  const [isActive,setIsActive] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [searchResults, setSearchResults] = useState("");

    return (
    <fieldset>
      <div className={styles.dropdown}>
      <div className= {styles.dropdownBtn} onClick={() => {
        setIsActive(!isActive); 
        setToggle(!toggle)
      }}>
        {selected}
        <span className={`${styles.arrow} ${isActive ? styles.down : '' }`} />
      </div>
      {isActive && (
        <div className= {`${styles.dropdownContent} ${toggle ? styles.show : ''}`}>
          <input type="text" id="myInput" className= {styles.dropdownSearch} onChange={event =>setSearchResults(event.target.value)}/>
          <div className={styles.dropdownItem}> Select API Call - Version 3</div>
          <div className={styles.dropdownStart}>ALL CALLS</div>
          {playground_requests.filter(option =>{
            if(searchResults === ""){
              return option;
            } else if ( option.title.toLowerCase().includes(searchResults.toLowerCase())){
              return option;
            }
          }).map((option) => (
            <div
              key={option.name}
              value= {option.title}
              onClick={(e) => {
                setSelected(option.title);
                setIsActive(false);
                handleChange(e, option.name);
              }}
              className= {`${styles.dropdownItem} ${ { selected } == option.title ? styles.select : ""}`}
            >
              {option.title}
            </div>
    
          ))}
        </div>
      )}
    </div>
  </fieldset>
    )
  }
  
  export default SelectRequestInput
  
