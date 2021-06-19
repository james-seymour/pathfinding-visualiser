import React, { useState } from "react"
import Visualiser from "./visualiser/Visualiser.js"

function setup_button_handlers() {
  // Use this function for all UI buttons maybe

}

function App() {

  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
      <div className="main">      
        <Visualiser />
      </div>
  )
}

export default App;