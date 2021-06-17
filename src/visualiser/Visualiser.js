import React from 'react'
import * as Constants from "../constants.js"
import Node from "./Node.js"

// Any {} tells the compiler this is JS specific code 

const Visualiser = () => {
    return (
        <div className="grid">
            {createInitialGrid()}
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
