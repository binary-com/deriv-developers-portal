import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import style from "./TokenInputField.module.scss";

const TokenInputField = ({
  isAppRegistration,
  label,
  sendTokenToJSON,
  token,
}) => {
  const [_token, setToken] = useState(token);

  useEffect(() => {
    if (!_token) {
      setToken(token);
    }
  }, [token]);

  const onEnter = (e) => {
    if (e.key === "Enter") sendTokenToJSON(_token);
  };

  return (
    <fieldset id="api-token-fieldset" className={style["api-token-fieldset"]}>
      <div className={style["api-token-wrapper"]}>
        {isAppRegistration ? (
          <p className={style["helper-label"]}>{label}</p>
        ) : null}
        <input
          type="text"
          id="api-token"
          className={
            isAppRegistration
              ? style["api-token-input-registration"]
              : style["api-token-input"]
          }
          placeholder="API Token"
          value={_token}
          onChange={(e) => setToken(e.currentTarget.value)}
          onKeyPress={onEnter}
        />
        <Button
          onClick={() => sendTokenToJSON(_token)}
          className={style.btnAuthenticate}
        >
          Authenticate
        </Button>
      </div>
    </fieldset>
  );
};

export default React.memo(TokenInputField);
