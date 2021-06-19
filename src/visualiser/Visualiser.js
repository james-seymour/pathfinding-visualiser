import React, { createContext, useState, useEffect } from 'react'
import * as Constants from "../constants.js"
import { calculateDijkstra, animateDijkstra } from '../algorithms/dijkstra.js'
import Node from "./Node.js"
import "./Visualiser.css" 



// Any {} tells the compiler this is JS specific code 

const Visualiser = (props) => {
    
	const [gridData, updateGridData] = React.useState(createGridData())
	// const fakeGridData = React.useRef(createGridData())
	// A toggle variables for mouse pressed, which is used for clicking and dragging walls
	const [mousePressed, updateMousePressed] = React.useState(false)
	const isRunning = React.useRef(false)

	// Use effects are fucking sick if the the element in brackets updates its state 
	// ([props.algorithmChoice]), then the function will be called.
	// More of these can be setup for any UI elements that arent just running an algorithm

	const toggleIsRunning = () => {
		isRunning.current = !isRunning.current
	}

	const clearWalls = () => {
		if (isRunning.current) return;
	}
	const clearAlgorithmSteps = () => {
		if (isRunning.current) return;
	}

	const clearEntireCanvas = () => {
		if (isRunning.current) return;
		updateGridData(createGridData())
	}

	const placeWallInGrid = (row, col) => {
		const newGrid = [...gridData]
		const wallNode = newGrid[row][col]
		const newNode = {
			...wallNode, isWall: !wallNode.isWall,
		}
		newGrid[row][col] = newNode
		return newGrid
	}

	const parseAlgorithmChoice = (algorithm) => {
		// Grab some variables that each algorithm needs
		const gridDataCopy = {gridData}
		const startNode = getStartNode(gridDataCopy)
		const endNode = getEndNode(gridDataCopy)


		switch(algorithm) {
			// Add more cases on here for more implementations
			// Visualiser algorithms do not need the current state of the gridData
			// because they can actually receive this state by calling the update function
			// See dijkstra.js
			case Constants.DIJKSTRA:
				//const algorithmCalculation = calculateDijkstra(gridDataCopy, startNode, endNode)
				// console.log(algorithmCalculation)
				// Animate here
				break;
			
			case Constants.ASTAR:
				break;
		}
	}	

	const handleMouseDown = (row, col) => {
		if (isRunning.current) return;
		// Place wall in grid
		updateGridData(placeWallInGrid(row, col))
		// console.log("MouseDown at", row, col)

		// "Hold" mouse down by setting mousePressed state to true
		updateMousePressed(true)
	}
	
	const handleMouseEnter = (row, col) => {
		if (isRunning.current) return;
		// console.log("MouseEnter at", row, col)
		if (mousePressed) {
			updateGridData(placeWallInGrid(row, col))
		}
	}
	
	const handleMouseUp = () => {
		if (isRunning.current) return;
		updateMousePressed(false)
		// console.log("MouseUp")
	}

	const renderGrid = () => {
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

	const renderUserInterface = () => {
		return (
			<div className="userinterface">   
				<button id="Dijkstra" className="algorithmButton"
				onClick={() => parseAlgorithmChoice(Constants.DIJKSTRA)}>
					Run Djikstra's Algorithm
				</button>
				<button id="AStar" className="algorithmButton"
				onClick={() => parseAlgorithmChoice(Constants.ASTAR)}>
					Run A* Algorithm
				</button>
				<button id="Greedy" className="algorithmButton"
				onClick={() => parseAlgorithmChoice(Constants.GREEDY)}>
					Run Greedy Best-First Search
				</button>
				<button id="Swarm" className="algorithmButton"
				onClick={() => parseAlgorithmChoice(Constants.SWARM)}>
					Run Swarm Algorithm
				</button>
				<button id="clear-walls" className="clearButton"
				onClick={() => clearWalls()}>
					Clear Walls!
				</button>
				<button id="clear-algorithm-steps" className="clearButton"
				onClick={() => clearAlgorithmSteps()}>
					Clear Previous Algorithm!
				</button>
				<button id="clear-board" className="clearButton"
				onClick={() => clearEntireCanvas()}>
					Clear the Entire Board!
				</button>
			</div>
		)
	}

	// Main Render State
	return (
		<>
			{renderUserInterface()}
			{renderGrid()}
		</>
	)

}

const getStartNode = (grid) => {
	//const startNode = grid[Constants.EXAMPLE_START_NODE[0]][Constants.EXAMPLE_START_NODE[1]]
	//return startNode
}

const getEndNode = (grid) => {
	//const endNode = grid[Constants.EXAMPLE_END_NODE[0]][Constants.EXAMPLE_END_NODE[1]]
	//return endNode
}

const createNode = (row, col) => {
	return ({
		row,
		col,
		isStart: row === Constants.EXAMPLE_START_NODE[0] && col === Constants.EXAMPLE_START_NODE[1],
		isFinish: row === Constants.EXAMPLE_END_NODE[0] && col === Constants.EXAMPLE_END_NODE[1],
		distance: Infinity,
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

export default Visualiser
