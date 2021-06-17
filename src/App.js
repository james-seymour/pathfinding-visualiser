import React from "react"
import Visualiser from "./visualiser/Visualiser.js"
import UserInterface from "./user_interface/UserInterface.js"

function App() {
  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
    <>
      <UserInterface />
      <Visualiser />
    </>
  )
}

export default App;