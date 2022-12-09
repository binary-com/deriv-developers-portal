/* eslint-disable no-import-assign */
import { useState, useEffect, useRef } from 'react';
import { playground_requests } from '../../../../data-stores/playground_requests';
import styles from './SelectRequestInput.module.scss';

const SelectRequestInput = ({ selected, setSelected, handleChange, selected_value }) => {
    const [isActive, setIsActive] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [searchResults, setSearchResults] = useState('');

    const ref = useRef(null);

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsActive(false);
        }
    };

    const handleToggleDropdown = () => {
        setIsActive(!isActive);
        setToggle(!toggle);
        setSearchResults('');
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div>
            <div className={styles.dropdown} ref={ref}>
                <div className={styles.dropdownBtn} onClick={handleToggleDropdown} data-testid='apiDropdown'>
                    <span>{selected_value}</span>
                    <span className={`${styles.arrow} ${isActive ? styles.down : ''}`} />
                </div>
                {isActive && (
                    <div className={`${styles.dropdownContent} ${toggle ? styles.show : ''}`}>
                        <input
                            autoFocus
                            type='text'
                            data-testid='searchInput'
                            className={styles.dropdownSearch}
                            onChange={event => {
                                setSearchResults(event.target.value);
                            }}
                        />
                        <div className={styles.dropdownList}>
                            <div className={styles.dropdownSelect}>
                                <span>Select API Call - Version 3</span>
                            </div>
                            <div className={styles.dropdownStart}>
                                <span>ALL CALLS</span>
                            </div>
                            {playground_requests
                                .filter(option => {
                                    return option.title.toLowerCase().includes(searchResults.toLowerCase())
                                        ? option
                                        : null;
                                })
                                .map(option => (
                                    <div
                                        key={option.name}
                                        value={option.title}
                                        onClick={e => {
                                            setSelected(option.title);
                                            setIsActive(false);
                                            handleChange(e, option.name);
                                        }}
                                        className={`${styles.dropdownItem}  ${
                                            selected === option.title ? styles.dropdownSelected : ''
                                        }`}
                                        data-testid={`apiDropdownItem${option.name}`}
                                    >
                                        <span>{option.title}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectRequestInput;
