import React from 'react';
import styles from './Checkbox.module.scss';

export default function Checkbox({ 
    name = null,
    id = "",
    label = "",
    className = "",
    value,
    onClickFunction = null
}) {
    const [is_checked, setIsChecked] = React.useState(false);
    const checkbox_active = is_checked ? " " + styles.activeCheckbox : "";
    const new_class_name = className !== "" ? " " + className : "";
    const toggleCheckbox = () => is_checked ? setIsChecked(false) : setIsChecked(true);
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
                    if (onClickFunction !== null) onClickFunction()
                    toggleCheckbox() 
                }} 
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}