import React, { useState } from "react"
import Visualiser from "./visualiser/Visualiser.js"
import UserInterface from "./user_interface/UserInterface.js"

function setup_button_handlers() {
  // Use this function for all UI buttons maybe

}


function App() {
   const [algorithmType, setAlgorithmType] = React.useState(0)
   function handleAlgorithmClick (value) {
    setAlgorithmType(value)
  }

  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
      <div className="main">      
        <UserInterface algorithmUpdater={handleAlgorithmClick}/>
        <Visualiser algorithmChoice={algorithmType}/>
      </div>
  )
}

export default App;