// import { useEffect } from 'react';

// export default function useSettingsDropdownEffect() {
//     useEffect(() => {
//         const hash_value = window.location.hash.split('#')[1];
//         // console.log(hash_value);
//         if (hash_value === 'set_settings') {
//             console.log('hello set settings ');
//             const dropdown = document.getElementById('settings-dropdown')
//             console.log(dropdown);
//             const event = new Event('change');
//             dropdown.addEventListener('change', function (e) { 
//                 dropdown.value = 'set_settings';
//                 console.log('dispatched');
//             }, false);
//             dropdown.dispatchEvent(event);
//         }
//     }, [window.location.hash]);
// }
