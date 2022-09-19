import './AppRegistration.scss';
import AppManagementLazy from '../AppManagement/AppManagementLazy';
import AppRegistrationForm from './AppRegistrationForm/AppRegistrationForm';
import AppRegistrationLogin from './AppRegistrationLogin/AppRegistrationLogin';
import RegisterAppDialogSuccess from './RegisterAppDialogSuccess/RegisterAppDialogSuccess';
import RegisteredAppTabs from './RegisterAppTabs/RegisteredAppTabs';

export default function AppRegistration() {
    return (
        <div id='app-registration-machine' className='register-app-form'>
            <AppRegistrationLogin />
            <div className='app-registration-logged-in'>
                <div className='app-registration-header'>
                    <h2 id='form-title' className='doc-sub-title form-title'>
                        Your apps
                    </h2>
                    <h4 className='form-subtitle'>Register your app, get an app ID, and start using the Deriv API.</h4>
                </div>
                <RegisteredAppTabs />
                <div className='register-app'>
                    <AppRegistrationForm />
                    <RegisterAppDialogSuccess />
                </div>
                <AppManagementLazy />
            </div>
        </div>
    );
}
