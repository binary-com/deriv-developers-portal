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
          className={`${style.playgroundContent}`}
      >
          <div className={style.headerTitle}>
              <Title headerSize="h1">
                  API Explorer
              </Title>
          </div>
          <div className={style.pageWrapper}>
              <div className={style.playground}>
                  <PlaygroundComponent />
              </div>
          </div>
      </div>
    </div>
  )
}

export default ApiExplorer
