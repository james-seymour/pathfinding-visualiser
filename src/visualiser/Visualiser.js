import React, { createContext, useState, useEffect } from 'react'
import * as Constants from "../constants.js"
import { calculateDijkstra, animateDijkstra } from '../algorithms/dijkstra.js'
import UserInterface from '../user_interface/UserInterface.js'
import Node from "./Node.js"
import "./Visualiser.css" 



// Any {} tells the compiler this is JS specific code 

const Visualiser = (props) => {
    
    
    // The useState function is given the initial grid data as an initial state, 
    // and whenever updateGridData is used to change the grid data, this will queue a re-render
    const [gridData, updateGridData] = React.useState(createGridData())
    // A toggle variables for mouse pressed, which is used for clicking and dragging walls
    const [mousePressed, updateMousePressed] = React.useState(false)

    // These things are fucking sick if the the element in brackets updates its state 
    // ([props.algorithmChoice]), then the function will be called.
    // More of these can be setup for any UI elements that arent just running an algorithm
    React.useEffect(() => {
        parseAlgorithmChoice(props.algorithmChoice, gridData, updateGridData)
    }, [props.algorithmChoice])
 
    const handleMouseDown = (row, col) => {
        // Place wall in grid
        const updatedGrid = placeWallInGrid(gridData, row, col)
        updateGridData(updatedGrid)
        // console.log("MouseDown at", row, col)

        // "Hold" mouse down by setting mousePressed state to true
        updateMousePressed(true)
    }
    
    const handleMouseEnter = (row, col) => {
        // console.log("MouseEnter at", row, col)
        if (mousePressed) {
            const updatedGrid = placeWallInGrid(gridData, row, col)
            updateGridData(updatedGrid)
        }
    }
    
    const handleMouseUp = () => {
        updateMousePressed(false)
        // console.log("MouseUp")
    }

    // Render HTML elements with the new gridData
    return (
        // We want to render our <Node /> components here using the a Board Model
        <div className="grid">
            {gridData.map((rowData, rowIndex) => {
                return (
                    <div key={rowIndex}>
                        {rowData.map((node, nodeIndex) => {
                            return (
                                <Node 
                                key={nodeIndex} 
                                row={rowIndex} 
                                col={nodeIndex} 
                                isStart={node.isStart} 
                                isFinish={node.isFinish} 
                                isWall={node.isWall}
                                onMouseDown={() => {handleMouseDown(node.row, node.col)}}
                                onMouseEnter={() => {handleMouseEnter(node.row, node.col)}}
                                onMouseUp={() => {handleMouseUp()}}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

}

const parseAlgorithmChoice = (algorithmChoice, gridData, updateGridData) => {
    switch(algorithmChoice) {
        // Add more cases on here for more implementations
        // Visualiser algorithms do not need the current state of the gridData
        // because they can actually receive this state by calling the update function
        // See dijkstra.js
        case Constants.DIJKSTRA:
            calculateDijkstra(updateGridData)
            //animateDijkstra(gridData)
    }
}

// This could also be used later to update specific nodes in the entire list
const placeWallInGrid = (grid, row, col) => {
    const newGrid = [...grid].slice()
    const wallNode = newGrid[row][col]
    const newNode = {
        ...wallNode, isWall: !wallNode.isWall,
    }
    newGrid[row][col] = newNode
    return newGrid
}


const createNode = (row, col) => {
    return ({
        row,
        col,
        isStart: row === Constants.EXAMPLE_START_NODE[0] && col === Constants.EXAMPLE_START_NODE[1],
        isFinish: row === Constants.EXAMPLE_END_NODE[0] && col === Constants.EXAMPLE_END_NODE[1],
        distance: Infinity,
        isWall: false
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
