import React, { createContext, useState } from 'react'
import * as Constants from "../constants.js"
import UserInterface from '../user_interface/UserInterface.js'
import Node from "./Node.js"
import "./Visualiser.css" 

// Any {} tells the compiler this is JS specific code 

const Visualiser = (props) => {
    
    console.log(props.algorithmChoice)
    
    const gridData = createGridData()
    return (
        // We want to render our <Node /> components here using the a Board Model
        <div className="grid">
            {gridData.map((rowData, rowIndex) => {
                return (
                    <div key={rowIndex}>
                        {rowData.map((node, nodeIndex) => {
                            return (
                                <Node row={rowIndex} col={nodeIndex} isStart={node.isStart} isFinish={node.isFinish}/>
                            )
                        }
                        )
                    }
                    </div>
                )
                }
            )
            }
        </div>
    )
}

const createNode = (row, col) => {
    return ({
        row,
        col,
        isStart: row === Constants.EXAMPLE_START_NODE[0] && col === Constants.EXAMPLE_START_NODE[1],
        isFinish: row === Constants.EXAMPLE_END_NODE[0] && col === Constants.EXAMPLE_END_NODE[1],
        distance: Infinity
    })
}

const createGridData = () => {
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
