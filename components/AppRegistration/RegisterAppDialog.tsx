export default function RegisterAppDialog () {
    return (
        <dialog open id="register_app_dialog" className="registration-dialog dialog-wrapper">
            <div className="dialog dialog-register">
                <div className="dialog-header">
                    <img id="close_register_dialog" src="/img/close_dialog.svg" alt="Close" />
                </div>
                <div className="dialog-body dialog-body-register">
                    <img className="dialog-success" src="/img/success.svg" alt="Success!" />
                    <h3>Success!</h3>
                    <div className="dialog-question">
                        You have successfully registered your application. You can now start using Deriv API
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="dialog-btn-cancel" id="register_got_it">Got it</button>
                    <button className="dialog-btn-submit" id="register_app_manage">Manage application</button>
                </div>
            </div>
        </dialog>
    )
}
