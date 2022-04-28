import CodeContent from "./CodeContent";
import React from "react";
import style from "./PlaygroundComponent.module.scss";

const ConsoleMessage = ({ message }) => {
    const payload = JSON.stringify(message.body, null, 4)
    return (
      <div className={style[message.type]}>
        <CodeContent lang="json" data={payload} />
      </div>
    )
  }
  
  export default ConsoleMessage
