import Button from "./Button";
import React from "react";
import style from "./ResetSendButtonsBlock.module.scss";
import { ticksSubject } from "./ticksSubject";

export const ResetSendButtonsBlock = (
  ({ isAppRegistration, sendRequest, resetMessagesInConsole, current_api, setScrollDirection,setIsScrolling,messagesRef,onScrollRequest,onScroll,scrollHeight,scrollTop }) => {
    const onClick = (event) => {
      current_api.connection.close();
      ticksSubject.complete();
      resetMessagesInConsole?.([]);
      onScroll?.(onScrollRequest)
      setScrollDirection?.("down")
      setIsScrolling?.("true")
    }
       return (
      <div className={style["json-btn-wrapper"]}>
        <div
          id="playground-reset-btn"
          className={
            isAppRegistration
              ? `${style["btn-reset"]} ${style["gray-btn-submit"]}`
              : `${style["btn-reset"]} ${style["btn-reset-playground"]}`
          }
        >
          <Button text={"Reset Connection"} clickHandler={onClick}  />
        </div>
        <div className={style["btn-submit"]}>
          <Button
            id="playground-send-btn"
            className={style["btn-submit"]}
            text={"Send Request"}
            clickHandler={sendRequest}
            onClick={onScrollRequest}
          />
        </div>
      </div>
    );
  }
);

ResetSendButtonsBlock.displayName = "ResetSendButtonsBlock";

export default ResetSendButtonsBlock;
