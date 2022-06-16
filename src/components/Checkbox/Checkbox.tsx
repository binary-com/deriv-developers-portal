import React from "react";
import styles from "./Checkbox.module.scss";

interface Checkbox {
  name: string;
  id: string;
  label: string;
  className : string;
  value : string;
  onClickFunction : any;
}

export default function Checkbox({
  name ,
  id ,
  label ,
  className ,
  value,
  onClickFunction 
}: Checkbox) {
  const [is_checked, setIsChecked] = React.useState(false);
  const checkbox_active = is_checked ? " " + styles.activeCheckbox : "";
  const new_class_name = className !== "" ? " " + className : "";
  const toggleCheckbox = () =>
    is_checked ? setIsChecked(false) : setIsChecked(true);
  return (
    <div>
      <input
        {...name}
        id={id}
        type="checkbox"
        defaultValue={value}
        defaultChecked={is_checked}
      />
      <span
        className={`${styles.customCheckbox}${checkbox_active}${new_class_name}`}
        onClick={() => {
          if (onClickFunction !== null) onClickFunction();
          toggleCheckbox();
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
