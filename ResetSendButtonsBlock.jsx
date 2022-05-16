import Button from "./Button";
import React from "react";
import style from "./ResetSendButtonsBlock.module.scss";

export const ResetSendButtonsBlock = React.memo(
    ({ isAppRegistration, sendRequest, resetMessagesInConsole, current_api }) => {
      const onClick = React.useCallback(() => {
        current_api.connection.close()
        resetMessagesInConsole?.([])
      }, [resetMessagesInConsole, current_api])
  
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
            <Button text={"Reset Connection"} clickHandler={onClick} />
          </div>
          <div className={style["btn-submit"]}>
            <Button
              id="playground-send-btn"
              className={style["btn-submit"]}
              text={"Send Request"}
              clickHandler={sendRequest}
            />
          </div>
        </div>
      )
    }
  )
  
  ResetSendButtonsBlock.displayName = "ResetSendButtonsBlock"

  export default ResetSendButtonsBlock;
