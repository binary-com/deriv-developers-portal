import { send } from '../../../../state/stateSignal';

export default function RegisteredAppTabs() {
    return (
        <div className='registered-apps-tabs'>
            <button onClick={() => send('REGISTER_TOGGLE_TAB')} id='register_button' className='register-button'>
                <label>Register your application</label>
            </button>
            <button onClick={() => send('MANAGE_TOGGLE_TAB')} id='manage_button' className='manage-button'>
                <label>Manage existing applications</label>
            </button>
        </div>
    );
}
