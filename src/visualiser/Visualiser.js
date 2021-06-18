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
    
    // These things are fucking sick if the the element in brackets updates its state 
    // ([props.algorithmChoice]), then the function will be called.
    // More of these can be setup for any UI elements that arent just running an algorithm
    React.useEffect(() => {
        parseAlgorithmChoice(props.algorithmChoice, gridData, updateGridData)
    }, [props.algorithmChoice])
 

    // Render HTML elements with the new gridData
    return renderHTMLElements(gridData)

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

const renderHTMLElements = (gridData) => {
    return (
        // We want to render our <Node /> components here using the a Board Model
        <div className="grid">
            {gridData.map((rowData, rowIndex) => {
                return (
                    <div key={rowIndex}>
                        {rowData.map((node, nodeIndex) => {
                            return (
                                <Node key={nodeIndex} row={rowIndex} col={nodeIndex} isStart={node.isStart} isFinish={node.isFinish}/>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const handleMouseDown = () => {

}

const handleMouseEnter = () => {
    
}

const handleMouseUp = () => {
    
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
