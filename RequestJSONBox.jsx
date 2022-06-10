import { ResetSendButtonsBlock } from "./ResetSendButtonsBlock";
import { useEffect, useRef, useState, memo } from "react";
import style from "./RequestJSONBox.module.scss";
import ConsoleMessage from "./ConsoleMessage";
import "./appid";

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
  inputListText,
}) => {
  const [scroll_direction, setScrollDirection] = useState("down");
  const [is_scrolling, setIsScrolling] = useState(true);
  const messagesRef = useRef(null);

  const onScrollRequest = (event) => {
    const scroll_height = event.target.scrollHeight;
    const scroll_top = event.target.scrollTop;
    const client_height = event.target.clientHeight;
    const reached_bottom = scroll_top + client_height >= scroll_height;
    const scrolling_top = scroll_top + client_height <= scroll_height;

    if (reached_bottom && scroll_direction === "down") {
      setIsScrolling(true);
      setScrollDirection("up");
    }

    if (scrolling_top && scroll_direction === "up") {
      setIsScrolling(false);
      setScrollDirection("down");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (is_scrolling) {
        messagesRef.current?.scrollTo({
          top: messagesRef.current.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    }, 1);
  }, [messagesRef, messages, is_scrolling]);
  return (
    <div
      className={isAppRegistration ? style.formContent : style.playgroundBox}
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
          onScroll={onScrollRequest}
        >
          {messages?.map((message, index) => (
            <ConsoleMessage key={"message" + index} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(RequestJSONBox);
