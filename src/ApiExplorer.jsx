import SchemaTitle from "../../components/Playground/SchemaTitle";
import { PlaygroundComponent } from "./PlaygroundComponent";
import React from "react";
import style from "./PlaygroundComponent.module.scss";

const ApiExplorer = () => {
  return (
    <div id="content" className={`${style.playgroundContent}`} data-testid="apiPlayground">
      <div className={style.headerTitle}>
        <SchemaTitle headerSize="h1">API Explorer</SchemaTitle>
      </div>
      <div className={style.pageWrapper}>
        <div className={style.playground}>
          <PlaygroundComponent />
        </div>
      </div>
    </div>
  );
};

export default ApiExplorer;
