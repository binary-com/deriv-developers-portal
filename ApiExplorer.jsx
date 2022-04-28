import Title from "./Title"
import { PlaygroundComponent } from "./PlaygroundComponent"
import React from "react"
import style from "./PlaygroundComponent.module.scss"
import Sidebar from "./Sidebar"
import './index.scss'

const ApiExplorer = () => {
  return (
    <div id="content" className='doc-content'>
    <Sidebar />
    <div
          id="content"
          className={`${style["playground-content"]}`}
      >
          <div className={style["header-title"]}>
              <Title headerSize="h1" className="">
                  API Explorer
              </Title>
          </div>
          <div className={`${style["page-wrapper"]}`}>
              <div className={style["playground"]}>
                  <PlaygroundComponent />
              </div>
          </div>
      </div>
    </div>
  )
}

export default ApiExplorer
