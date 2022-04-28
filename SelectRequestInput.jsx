import style from "./PlaygroundComponent.module.scss";
import React, { useEffect } from "react";
import { playground_requests } from "./Playground_Requests";

const SelectRequestInput = ({ handleChange, selected_value }) => {
    const request_body = playground_requests.find(
      el => (el.name || el.title) === selected_value
    )
    const default_value = request_body?.title || "Select API Call - Version 3"
    playground_requests.sort((a, b) => a.title.localeCompare(b.title))
    useEffect(() => {
      window.location.hash = request_body ? request_body.name : ""
    }, [selected_value])
  
    return (
      <fieldset className={style["api-request"]}>
        <select
          className={style["select2"]}
          onChange={handleChange}
          defaultValue={default_value}
        >
          <option disabled>{default_value}</option>
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
  
  export default React.memo(SelectRequestInput)
  
