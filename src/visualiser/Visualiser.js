import React, { Component, createContext, useState, useEffect } from 'react'
import { calculateDijkstra, animateDijkstra } from '../algorithms/dijkstra.js'
import Node from "./Node.js"
import "./Visualiser.css" 



// Any {} tells the compiler this is JS specific code 

export default class Visualiser extends Component {
	constructor() {
		super();
    this.state = {
      gridData: [],
      START_NODE_ROW: 5,
      END_NODE_ROW: 5,
      START_NODE_COL: 5,
      END_NODE_COL: 15,
      userPaintingWalls: false,
			userMovingStartNode: false,
			userMovingEndNode: false,
      NUM_ROWS: 22,
      NUM_COLS: 40,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currentRow: 0,
      currentCol: 0,
    };

		//this.handleMouseDown = this.handleMouseDown.bind(this);
		//this.handleMouseLeave = this.handleMouseLeave.bind(this);
		//this.toggleIsRunning = this.toggleIsRunning.bind(this);
	}

	componentDidMount() {
		const gridData = this.createGridData()
		this.setState({ gridData })
	}
	
	createNode = (row, col, isWall=false) => {
		return ({
			row,
			col,
			isStart: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
			isFinish: row === this.state.END_NODE_ROW && col === this.state.END_NODE_COL,
			isWall: isWall,
			distance: Infinity,
			distanceToFinishNode: 
				Math.abs(this.state.END_NODE_ROW - row) +
				Math.abs(this.state.END_NODE_COL - col), 
			isVisited: false,
			previousNode: null,
		})
	}

	createGridData = () => {
    const initialGrid = [];
    for (let row = 0; row < this.state.NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.NUM_COLS; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  }

	getStartNode = (gridDataCopy) => {
		const startNode = gridDataCopy[this.state.START_NODE_ROW][this.state.START_NODE_COL]
		return startNode
	}
	
	getEndNode = (gridDataCopy) => {
		const endNode = gridDataCopy[this.state.END_NODE_ROW][this.state.END_NODE_COL]
		return endNode
	}

	handleMouseDown(row, col) {
		if (this.state.isRunning) return;
		if (this.state.START_NODE_ROW === row && this.state.START_NODE_COL === col) {
			this.setState({ userMovingStartNode: true })
		} else if (this.state.END_NODE_ROW === row && this.state.END_NODE_COL === col) {
			this.setState({ userMovingEndNode: true })
		} else {
			this.setState({ userPaintingWalls: true })
			document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
		}
	}
	
	handleMouseEnter(row, col) {
		if (this.state.isRunning) return;
		
		if (this.state.userMovingStartNode) {
			document.getElementById(`node-${this.state.START_NODE_ROW}-${this.state.START_NODE_COL}`).className = 'node'
			document.getElementById(`node-${row}-${col}`).className = 'node node-start'
			this.setState({ START_NODE_ROW: row, START_NODE_COL: col })
		} else if (this.state.userMovingEndNode) {
			document.getElementById(`node-${this.state.END_NODE_ROW}-${this.state.END_NODE_COL}`).className = 'node'
			document.getElementById(`node-${row}-${col}`).className = 'node node-finish'
			this.setState({ END_NODE_ROW: row, END_NODE_COL: col })
		} else if (this.state.userPaintingWalls) {
			document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
		}
	}
	
	handleMouseUp() {
		if (this.state.isRunning) return;
		this.setState({ userMovingStartNode: false, userMovingEndNode: false, userPaintingWalls: false })
	}
	
	syncHTMLwithGridData = () => {
		const syncedGrid = []
		for (let row = 0; row < this.state.NUM_ROWS; row++) {
			const currentRow = []
			for (let col = 0; col < this.state.NUM_COLS; col++) {
				if (document.getElementById(`node-${row}-${col}`).className === 'node node-wall') {
					currentRow.push(this.createNode(row, col, true))
				} else {
					currentRow.push(this.createNode(row, col))
				}
			}
			syncedGrid.push(currentRow)
		}
		return syncedGrid
	}

	toggleIsRunning() {
		this.setState({isRunning: !this.state.isRunning})
	}

	parseAlgorithmChoice(algorithm) {
		if (this.state.isRunning) return;
		// Set the state to running!
		this.setState({isRunning: true})

		// Grab some variables that each algorithm needs
		const syncedGrid = this.syncHTMLwithGridData()
		const startNode = this.getStartNode(syncedGrid)
		const endNode = this.getEndNode(syncedGrid)


		switch(algorithm) {
			// Add more cases on here for more implementations
			// Visualiser algorithms do not need the current state of the gridData
			// because they can actually receive this state by calling the update function
			// See dijkstra.js
			case "dijkstra":
				const { algorithmCalculation, endNodeReachable } = calculateDijkstra(syncedGrid, startNode, endNode)

				this.animateAlgorithm(algorithmCalculation)
				break;
			
			case "A*":
				break;
		}
	}

	animateAlgorithm = (algorithmCalculation) => {
		for (let i = 1; i < algorithmCalculation.length - 1; i++) {
			setTimeout(() => {
				const node = algorithmCalculation[i]
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
			}, 10 * i)
		}
		setTimeout(() => {
			this.setState({isRunning: false})
		}, 10 * (algorithmCalculation.length + 1))
		this.setState({gridData: this.syncHTMLwithGridData()})
	}

	resetGridUsingFilter = (filter) => {
		for (let row = 0; row < this.state.NUM_ROWS; row++) {
			for (let col = 0; col < this.state.NUM_COLS; col++) {
				const node = this.state.gridData[row][col]
				if (node.isStart || node.isFinish || 
					document.getElementById(`node-${row}-${col}`).className === `node ${filter}`) continue;
				else {document.getElementById(`node-${row}-${col}`).className = `node`}
			}
		}
	}

	clearWalls() {
		if (this.state.isRunning) return;
		this.resetGridUsingFilter('node-visited')
	}

	clearAlgorithmSteps() {
		if (this.state.isRunning) return;
		this.resetGridUsingFilter('node-wall')
	}

	clearEntireCanvas() {
		if (this.state.isRunning) return;
		this.setState({gridData: this.createGridData()})
		this.resetGridUsingFilter('')
	}

	renderGrid() {
		const gridData = this.state.gridData
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
				onClick={() => this.parseAlgorithmChoice("dijkstra")}>
					Run Djikstra's Algorithm
				</button>
				<button id="AStar" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice("A*")}>
					Run A* Algorithm
				</button>
				<button id="Greedy" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice("greedy")}>
					Run Greedy Best-First Search
				</button>
				<button id="Swarm" className="algorithmButton"
				onClick={() => this.parseAlgorithmChoice("swarm")}>
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





