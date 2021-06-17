import React from "react"
import Grid from "./visualiser/Visualiser.js"
import Header from "./user_interface/UserInterface.js"

function App() {
  // In order to return more than one HTML element at once, wrap in an empty element:
  return (
    <>
      <Header />
      <Grid />
      <input type="text"></input>
      <button>Add Todo</button>
      <button>Clear Todo</button>
      <div>0 left todo</div>
    </>
  )
}

export default App;