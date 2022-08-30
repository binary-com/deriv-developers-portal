import React from "react";

export function useHashChange() {
    const [hash_state, setHashState] = React.useState('');

    const storeHash = () => {
        setHashState(window.location.hash.split("#")[1])
        window.addEventListener("hashchange", storeHash, false);
    }

    React.useEffect(() => {
        window.addEventListener("hashchange", storeHash, false);
    }, [window.location.hash]);

    return hash_state;
}
