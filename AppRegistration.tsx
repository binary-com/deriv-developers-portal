import './AppRegistration.scss';
import AppManagementLazy from './components/AppRegistration/AppManagementLazy';
import AppRegistrationForm from './components/AppRegistration/AppRegistrationForm';
import AppRegistrationLogin from './components/AppRegistration/AppRegistrationLogin';
import RegisterAppDialogSuccess from './components/AppRegistration/RegisterAppDialogSuccess';
import RegisteredAppTabs from './components/AppRegistration/RegisteredAppTabs';

export default function AppRegistration() {
  return (
    <div id="app-registration-machine" className="register-app-form">
      <AppRegistrationLogin />
      <div className="app-registration-logged-in">
        <div className="app-registration-header">
          <h2 id="form-title" className="doc-sub-title form-title">Your Apps</h2>
          <h4 className="form-subtitle">Register your app to get an app ID and start using Deriv API for personal or
            business purposes</h4>
        </div>
        <RegisteredAppTabs />
        <div className="register-app">
          <AppRegistrationForm />
          <RegisterAppDialogSuccess />
        </div>
        <AppManagementLazy />
      </div>
    </div>
  )
}
