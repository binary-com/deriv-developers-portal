import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { send } from '../../../state/stateSignal';
import styles from './Header.module.scss';

interface LinkProps {
    location: string;
    name: string;
}

export default function HamburgerLink({ location, name }: LinkProps) {
    const [is_on_current_location, setIsOnCurrentLocation] = useState(false);
    const location_no_slash = location.substring(0, location.length - 1);
    useEffect(() => {
        const is_valid_pathname =
            window.location.pathname === location || window.location.pathname === location_no_slash;
        if (is_valid_pathname) {
            setIsOnCurrentLocation(true);
        } else {
            setIsOnCurrentLocation(false);
        }
    }, [window.location.pathname]);

    return (
        <Link
            className={is_on_current_location ? styles.selected : ''}
            onClick={() => send('TOGGLE_HAMBURGER')}
            to={location}
        >
            {name}
        </Link>
    );
}
