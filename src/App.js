import React, { useState } from "react"
import Visualiser from "./visualiser/Visualiser.js"


function App() {

  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
      <div className="main">      
        <Visualiser />
      </div>
  )
}

export default App;