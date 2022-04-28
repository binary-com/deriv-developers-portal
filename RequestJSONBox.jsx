import { ResetSendButtonsBlock } from "./ResetSendButtonsBlock";
import React, { useEffect, useRef } from "react";
import style from "./RequestJSONBox.module.scss";
import ConsoleMessage from './ConsoleMessage'
import "./appid"
// import  "./PlaygroundComponent";

const RequestJSONBox = ({
    request_example,
    messages,
    handleChange,
    isAppRegistration,
    request_input,
    sendRequest,
    setMessages,
    current_api,
    isRegister,
    inputListText
  }) => {
    const messagesRef = useRef(null)
    useEffect(() => {
      setTimeout(() => {
        messagesRef.current?.scrollTo({
          top: messagesRef.current.scrollHeight,
          left: 0,
          behavior: "smooth"
        })
      }, 500)
    }, [messagesRef, messages])
  
    return (
      <div
        className={
          isAppRegistration ? style["form-content"] : style["playground-box"]
        }
      >
        {isAppRegistration ? (
          <div className={style["app-registration-subheader"]}>Request JSON</div>
        ) : (
          <label className={style["inline-label"]}>Request JSON</label>
        )}
        <textarea
          id="playground-request"
          className={
            isAppRegistration
              ? `${style["textarea-request"]} ${style["registration-request"]}`
              : `${style["textarea-request"]} ${style["playground-request"]}`
          }
          placeholder={"Request JSON"}
          ref={request_input}
          value={
            isAppRegistration && isRegister
              ? JSON.stringify(inputListText, null, 2)
              : request_example
          }
          onChange={handleChange}
          spellCheck={isAppRegistration ? false : undefined}
        />
        <ResetSendButtonsBlock
          isAppRegistration={isAppRegistration}
          sendRequest={sendRequest}
          resetMessagesInConsole={setMessages}
          current_api={current_api}
        />
        {messages.length > 1 && (
          <div
            id="playground-console"
            className={style["playground-console"]}
            ref={messagesRef}
          >
            {messages?.map((message, index) => (
              <ConsoleMessage key={"message" + index} message={message} />
            ))}
          </div>
        )}
      </div>
    )
  }
  
  export default React.memo(RequestJSONBox)
