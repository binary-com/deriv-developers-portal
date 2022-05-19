import styles from "./PlaygroundComponent.module.scss";
import { useEffect, useState } from "react";
import { playground_requests } from "./Playground_Requests";

const SelectRequestInput = ({ handleChange, selected_value }) => {
    const [link_hash_value, setLinkHashValue] = useState("");
    const [hash_value_title, setHashValueTitle] = useState("");
    const request_body = playground_requests.find(
      el => (el.name || el.title) === selected_value
    )
    const default_value = request_body?.title || "Select API Call - Version 3"
    playground_requests.sort((a, b) => a.title.localeCompare(b.title))

    // To explain about the useEffects below:
    // If the user clicks a link with a hash that redirects to the api-explorer page,
    // the hash in the link will be used to immediately display the specific data.
    useEffect(() => {
        if (window.location.hash) {
          const hash_value = window.location.hash.split("#")[1];
          setLinkHashValue(hash_value);
        }
    }, [window.location.hash])
    
    useEffect(() => {
      if (link_hash_value.length > 0) {
        const find_select_value = playground_requests.find(el => el.name === link_hash_value);
        setHashValueTitle(find_select_value?.title);
      }
    }, [link_hash_value, playground_requests])

    // This useEffect has mainly a UX purpose, so that the user can see
    // what function they selected in the link (hash).
    useEffect(() => {
      if (selected_value && request_body) {
        window.location.hash = request_body ? request_body.name : window.location.hash || "";
      }
    }, [selected_value, request_body, window.location.hash])

    return (
      <fieldset className={styles.apiRequest}>
        <select
          className={styles.select2}
          onChange={handleChange}
          defaultValue={link_hash_value ? hash_value_title : default_value}
          id="settings-dropdown"
        >
          <option disabled className={styles.option}>{link_hash_value ? hash_value_title : default_value}</option>
          <optgroup label="All calls">
            {playground_requests.map(el => (
              <option value={el.name} key={el.name}>
                {el.title}
              </option>
            ))}
          </optgroup>
        </select>
      </fieldset>   
    )
  }
  
  export default SelectRequestInput
  
