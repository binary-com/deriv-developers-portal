import { Link } from "react-router-dom";
import { send } from "../../stateSignal";
import styles from "./Header.module.scss";

interface LinkProps {
    location: string;
    name: string;
}

export default function HamburgerLink({ location, name }:LinkProps) {
    const is_current_location = window.location.pathname === location;
    return ( 
        <Link 
            className={is_current_location ? styles.selected : ""}
            onClick={() => send('TOGGLE_HAMBURGER') }
            to={location}
        >
            {name}
        </Link>
    )
}
