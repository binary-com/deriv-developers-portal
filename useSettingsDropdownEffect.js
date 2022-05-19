import { useLayoutEffect } from 'react';

export default function useSettingsDropdownEffect() {
    useLayoutEffect(() => {
        const hash_value = window.location.hash.split('#')[1];
        // console.log(hash_value);
        if (hash_value === 'set_settings') {
            console.log('hello set settings ');
            const dropdown = document.getElementById('settings-dropdown')
            const event = new Event('change');
            dropdown.addEventListener('change', function (e) { 
                e.target.value = 'set_settings';
            }, true);
            dropdown.dispatchEvent(event);
        }
    }, [window.location.hash]);
}
