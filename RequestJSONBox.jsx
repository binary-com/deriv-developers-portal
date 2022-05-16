import { ResetSendButtonsBlock } from "./ResetSendButtonsBlock";
import React, { useEffect, useRef } from "react";
import style from "./RequestJSONBox.module.scss";
import ConsoleMessage from './ConsoleMessage'
import "./appid"

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
          isAppRegistration ? style.formContent : style.playgroundBox
        }
      >
        {isAppRegistration ? (
          <div className={style.appRegistrationSubheader}>Request JSON</div>
        ) : (
          <label className={style.inlineLabel}>Request JSON</label>
        )}
        <textarea
          id="playground-request"
          className={
            isAppRegistration
              ? `${style.textareaRequest} ${style.registrationRequest}`
              : `${style.textareaRequest} ${style.playgroundRequest}`
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
            className={style.playgroundConsole}
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
