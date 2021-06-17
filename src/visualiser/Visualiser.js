import React, { useState } from 'react'
import * as Constants from "../constants.js"
import UserInterface from '../user_interface/UserInterface.js'
import Node from "./Node.js"

// Any {} tells the compiler this is JS specific code 

const Visualiser = (props) => {
    
    const [clicked, setClicked] = React.useState(false)
    function handleClick(e) {
        setClicked(!clicked)
        console.log(clicked)
    }

    return (
        <div className="grid">
            {createInitialGrid()}
            <UserInterface clicked={handleClick}/>
        </div>
        
    )
}

const createNode = (row, col) => {
    return (
        <Node row={row} col={col}/>
    )
}

const createInitialGrid = () => {
    const grid = []
    for (let row = 0; row < Constants.NUM_ROWS; row++) {
        const currentRow = []
        for (let col = 0; col < Constants.NUM_COLS; col++) {
            currentRow.push(createNode(row, col))
        }
        grid.push(currentRow)
    }
    return grid
}

export default Visualiser
