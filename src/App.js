import React, { useState } from "react"
import Visualiser from "./visualiser/Visualiser.js"
import "./App.css"

function App() {
  // Do some really hacky tricks to properly set css
  document.documentElement.style.setProperty("--screen-x", Math.floor(((window.screen.width - 100) / 30)))
  document.body.style = 'background-color: rgb(42, 42, 42);'
  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
      <div className="main">  
        <Visualiser />
      </div>
  )
}

export default App;