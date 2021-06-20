import React, { createContext, useState, useEffect } from 'react'
import * as Constants from "../constants.js"
import Node from "./Node.js"
import "./Visualiser.css" 

// Creation of 2D array of objects which hold each nodes' data
const createNode = (row, col) => {
	return ({
		row,
		col,
		isWall: false,
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

// Main functional component
export default Visualiser = () => {
    
	const [gridData, updateGridData] = React.useState(createGridData())
	const [mousePressed, updateMousePressed] = React.useState(false)

	// Toggles the 'wall' property for a Node at row, col 
	const placeWallInGrid = (row, col) => {
		const newGrid = [...gridData]
		const wallNode = newGrid[row][col]
		const newNode = {
			...wallNode, isWall: !wallNode.isWall,
		}
		newGrid[row][col] = newNode
		return newGrid
	}

	// Possible useCallback functions that are called in child <Node /> components
	const handleMouseDown = (row, col) => {
		updateGridData(placeWallInGrid(row, col))
		updateMousePressed(true)
	}
	
	const handleMouseEnter = (row, col) => {
		if (mousePressed) {
			updateGridData(placeWallInGrid(row, col))
		}
	}
	
	const handleMouseUp = () => {
		updateMousePressed(false)
	}

	// Possible useMemo?
	return (
		<div className="grid">
			{gridData.map((rowData, rowIndex) => {
				return (
					<div key={rowIndex}>
						{rowData.map((node, nodeIndex) => {
							return (
								<Node 
								key={nodeIndex} 
								nodeData={node}
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