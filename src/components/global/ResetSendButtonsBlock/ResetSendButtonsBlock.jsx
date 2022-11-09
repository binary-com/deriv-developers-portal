import Button from '../GeneralButton/GeneralButton';
import React from 'react';
import style from './ResetSendButtonsBlock.module.scss';
import { ticksSubject } from '../../../global-functions/ticksSubject';

export const ResetSendButtonsBlock = ({
    isAppRegistration,
    sendRequest,
    resetMessagesInConsole,
    current_api,
    setIsScrolling,
    setScrollDirection,
}) => {
    const onClick = () => {
        setScrollDirection('down');
        current_api.connection.close();
        ticksSubject.complete();
        resetMessagesInConsole?.([]);
        setIsScrolling?.(true);
    };
    return (
        <div className={style['json-btn-wrapper']}>
            <div
                id='playground-reset-btn'
                className={
                    isAppRegistration
                        ? `${style['btn-reset']} ${style['gray-btn-submit']}`
                        : `${style['btn-reset']} ${style['btn-reset-playground']}`
                }
            >
                <Button text={'Reset Connection'} clickHandler={onClick} />
            </div>
            <div className={style['btn-submit']}>
                <Button
                    id='playground-send-btn'
                    className={style['btn-submit']}
                    text={'Send Request'}
                    clickHandler={sendRequest}
                />
            </div>
        </div>
    );
};

ResetSendButtonsBlock.displayName = 'ResetSendButtonsBlock';

export default ResetSendButtonsBlock;
