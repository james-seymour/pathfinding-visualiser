import React, { PureComponent, createContext, useState, useEffect } from 'react'
import * as Constants from "../constants.js"
import { calculateDijkstra, animateDijkstra } from '../algorithms/dijkstra.js'
import { v4 as uuidv4 } from "uuid"
import Node from "./Node.js"
import "./Visualiser.css" 



// Any {} tells the compiler this is JS specific code 

export default class Visualiser extends PureComponent {
	constructor() {
		super();
		this.state = {
			keyList: [],
			gridData: [],
			mouseIsPressed: false,
			isRunning: false,
		}
	}

	componentDidMount() {
		const keyList = createKeyList()
		const gridData = createGridData()
		this.setState({ keyList, gridData })
	}

	handleMouseDown(row, col) {
		if (this.state.isRunning) return;
		const newGrid = placeWallInGrid(this.state.gridData, row, col)
		this.setState({grid: newGrid, mouseIsPressed: true})
	}
	
	handleMouseEnter(row, col) {
		if (this.state.isRunning) return;
		// console.log("MouseEnter at", row, col)
		if (this.state.mouseIsPressed) {
			const newGrid = placeWallInGrid(this.state.gridData, row, col)
			this.setState({ grid: newGrid })
		}
	}
	
	handleMouseUp() {
		if (this.state.isRunning) return;
		this.setState({ mouseIsPressed: false })
		// console.log("MouseUp")
	}

	// Use effects are fucking sick if the the element in brackets updates its state 
	// ([props.algorithmChoice]), then the function will be called.
	// More of these can be setup for any UI elements that arent just running an algorithm

	toggleIsRunning() {
		this.setState({isRunning: !this.state.isRunning})
	}

	clearWalls() {
		if (this.state.isRunning) return;
	}

	clearAlgorithmSteps() {
		if (this.state.isRunning) return;
	}

	clearEntireCanvas() {
		if (this.state.isRunning) return;
		this.setState({gridData: createGridData()})
	}

	parseAlgorithmChoice(algorithm) {
		// Set the state to running!
		
		// Grab some variables that each algorithm needs
		const gridDataCopy = [...this.state.gridData]
		const startNode = getStartNode(gridDataCopy)
		const endNode = getEndNode(gridDataCopy)


		switch(algorithm) {
			// Add more cases on here for more implementations
			// Visualiser algorithms do not need the current state of the gridData
			// because they can actually receive this state by calling the update function
			// See dijkstra.js
			case Constants.DIJKSTRA:
				const algorithmCalculation = calculateDijkstra(gridDataCopy, startNode, endNode)

				for (let i = 1; i < algorithmCalculation.length - 1; i++) {
					setTimeout(() => {
						const node = algorithmCalculation[i]
						document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
					}, 10 * i)
				}

				break;
			
			case Constants.ASTAR:
				break;
		}
	}	



	renderGrid() {
		const { keyList, gridData, mouseIsPressed, isRunning } = this.state

		return (
			// We want to render our <Node /> components here using the a Board Model
			<div className="grid">
				{gridData.map((rowData, rowIndex) => {
					return (
						<div key={rowIndex}>
							{rowData.map((node, nodeIndex) => {
								return (
									<Node 
									key={keyList[rowIndex][nodeIndex]} 
									nodeData={node}
									onMouseDown={(row, col) => {this.handleMouseDown(row, col)}}
									onMouseEnter={(row, col) => {this.handleMouseEnter(row, col)}}
									onMouseUp={() => {this.handleMouseUp()}}
									/>
								)
							})}
						</div>
					)
				})}
			</div>
		)
	}

	renderUserInterface() {
		return (
			<div className="userinterface">   
				<button id="Dijkstra" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice(Constants.DIJKSTRA)}>
					Run Djikstra's Algorithm
				</button>
				<button id="AStar" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice(Constants.ASTAR)}>
					Run A* Algorithm
				</button>
				<button id="Greedy" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice(Constants.GREEDY)}>
					Run Greedy Best-First Search
				</button>
				<button id="Swarm" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice(Constants.SWARM)}>
					Run Swarm Algorithm
				</button>
				<button id="clear-walls" className="clearButton"
				onClick={() => this.clearWalls()}>
					Clear Walls!
				</button>
				<button id="clear-algorithm-steps" className="clearButton"
				onClick={() => this.clearAlgorithmSteps()}>
					Clear Previous Algorithm!
				</button>
				<button id="clear-board" className="clearButton"
				onClick={() => this.clearEntireCanvas()}>
					Clear the Entire Board!
				</button>
			</div>
		)
	}

	// Main Render State
	render() {
		return (		
			<>
			{this.renderUserInterface()}
			{this.renderGrid()}
			</>
		)
	}
}

const placeWallInGrid = (grid, row, col) => {
	const newGrid = grid.slice()
	const wallNode = newGrid[row][col]
	const newNode = {
		...wallNode, isWall: !wallNode.isWall,
	}
	newGrid[row][col] = newNode
	return newGrid
}

const getStartNode = (grid) => {
	const startNode = grid[Constants.EXAMPLE_START_NODE[0]][Constants.EXAMPLE_START_NODE[1]]
	return startNode
}

const getEndNode = (grid) => {
	const endNode = grid[Constants.EXAMPLE_END_NODE[0]][Constants.EXAMPLE_END_NODE[1]]
	return endNode
}

const createNode = (row, col) => {
	return ({
		row,
		col,
		isStart: row === Constants.EXAMPLE_START_NODE[0] && col === Constants.EXAMPLE_START_NODE[1],
		isFinish: row === Constants.EXAMPLE_END_NODE[0] && col === Constants.EXAMPLE_END_NODE[1],
		isWall: false,
		distance: Infinity,
		isVisited: false,
		previousNode: null,
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

const createKeyList = () => {
	const keyList = []
	for (let row = 0; row < Constants.NUM_ROWS; row++) {
		const currentRow = []
		for (let col = 0; col < Constants.NUM_COLS; col++) {
			currentRow.push(uuidv4())
		}
		keyList.push(currentRow)
	}
	return keyList
}



