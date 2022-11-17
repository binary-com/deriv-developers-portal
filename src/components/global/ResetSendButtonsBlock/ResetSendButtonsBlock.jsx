import React from "react";
import Button from "../GeneralButton/GeneralButton";
import style from "./ResetSendButtonsBlock.module.scss";
import { ticksSubject } from "../../../global-functions/ticksSubject";

export const ResetSendButtonsBlock = ({
  isAppRegistration,
  sendRequest,
  resetMessagesInConsole,
  current_api,
  setIsScrolling,
  setScrollDirection,
}) => {
  const onClick = () => {
    setScrollDirection("down");
    current_api.connection.close();
    ticksSubject.complete();
    resetMessagesInConsole?.([]);
    setIsScrolling?.(true)
  }
  return (
    <div className={style.jsonBtnWrapper}>
      <div
        id="playground-reset-btn"
        className={
          isAppRegistration
            ? `${style.btnReset} ${style.grayBtnSubmit}`
            : `${style.btnReset} ${style.btnResetPlayground}`
        }
      >
        <Button text={"Reset Connection"} clickHandler={onClick} />
      </div>
      <div className={style.btnSubmit}>
        <Button
          id="playground-send-btn"
          className={style.btnSubmit}
          text={"Send Request"}
          clickHandler={sendRequest}
        />
      </div>
    </div>
  );
};

ResetSendButtonsBlock.displayName = 'ResetSendButtonsBlock';

export default ResetSendButtonsBlock;
