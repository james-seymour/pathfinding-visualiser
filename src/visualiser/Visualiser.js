import React, { Component, createContext, useState, useEffect } from 'react'
import { calculateDijkstra } from '../algorithms/dijkstra.js'
import { dfs } from "../algorithms/dfs.js"
import Node from "./Node.js"
import "./Visualiser.css" 

// Any {} tells the compiler this is JS specific code 

export default class Visualiser extends Component {
	constructor() {
		super();
    this.state = {
      gridData: [],
      START_NODE_ROW: Math.floor((window.screen.height / 200) - 1),
			START_NODE_COL: Math.floor((window.screen.width / 300) - 1),
      END_NODE_ROW: Math.floor((window.screen.height * 3 / 200)),
      END_NODE_COL: Math.floor((window.screen.width * 5 / 300)),
      userPaintingWalls: false,
			userMovingStartNode: false,
			userMovingEndNode: false,
      NUM_ROWS: Math.floor(((window.screen.height - 250) / 30)),
      NUM_COLS: Math.floor(((window.screen.width - 100) / 30)),
			// NUM_ROWS: 15,
      // NUM_COLS: 25,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currentRow: 0,
      currentCol: 0,
    };
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

	getNodeClassName(row, col) {
		return document.getElementById(`node-${row}-${col}`).className
	}

	updateNodeClassName(row, col, className) {
		document.getElementById(`node-${row}-${col}`).className = `node ${className}`
	}

	handleMouseDown(row, col) {
		console.log(this.state)
		if (this.state.isRunning) return;
		
		if (this.state.START_NODE_ROW === row && this.state.START_NODE_COL === col) {
			this.setState({ userMovingStartNode: true })
		} else if (this.state.END_NODE_ROW === row && this.state.END_NODE_COL === col) {
			this.setState({ userMovingEndNode: true })
		} else {
			this.setState({ userPaintingWalls: true })
			this.updateNodeClassName(row, col, 'node-wall')
		}
	}
	
	handleMouseEnter(row, col) {
		const startNode = this.state.START_NODE_ROW === row && this.state.START_NODE_COL === col
		const endNode = this.state.END_NODE_ROW === row && this.state.END_NODE_COL === col
		if (this.state.isRunning || startNode || endNode) return;
		
		if (this.state.userMovingStartNode) {
			this.updateNodeClassName(this.state.START_NODE_ROW, this.state.START_NODE_COL, '')
			this.updateNodeClassName(row, col, 'node-start')
			this.setState({ START_NODE_ROW: row, START_NODE_COL: col })
		} else if (this.state.userMovingEndNode) {
			this.updateNodeClassName(this.state.END_NODE_ROW, this.state.END_NODE_COL, '')
			this.updateNodeClassName(row, col, 'node-finish')
			this.setState({ END_NODE_ROW: row, END_NODE_COL: col })
		} else if (this.state.userPaintingWalls) {
			this.updateNodeClassName(row, col, 'node-wall')
		}
	}
	
	handleMouseUp() {
		if (this.state.isRunning) return;
		this.setState({ userMovingStartNode: false, userMovingEndNode: false, userPaintingWalls: false })
		this.syncHTMLwithGridData(this.state.gridData)
	}
	
	syncHTMLwithGridData = () => {
		const syncedGrid = []
		for (let row = 0; row < this.state.NUM_ROWS; row++) {
			const currentRow = []
			for (let col = 0; col < this.state.NUM_COLS; col++) {
				if (this.getNodeClassName(row, col) === 'node node-wall') {
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
		this.resetElementInGrid('node-wall')

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
				// if (endNodeReachable) {this.animateShortestPath(dijkstraCalculation)}
				break;
			
			case "A*":
				const dfsCalculation = dfs(syncedGrid, startNode, endNode)
				this.animateAlgorithm(dfsCalculation)
				break;
		}
	}

	animateAlgorithm = (algorithmCalculation) => {
		for (let i = 1; i < algorithmCalculation.length - 1; i++) {
			setTimeout(() => {
				const node = algorithmCalculation[i]
				this.updateNodeClassName(node.row, node.col, 'node-visited')
			}, 10 * i)
		}
		setTimeout(() => {
			this.setState({isRunning: false})
		}, 10 * (algorithmCalculation.length + 1))
		this.setState({gridData: this.syncHTMLwithGridData()})
	}

	animateShortestPath = (algorithmCalculation) => {

	}

	// if (node.isStart || node.isFinish || 
	// 	this.getNodeClassName(row, col) === `node ${filter}`) continue;
	// else {this.updateNodeClassName(row, col, '')}

	resetElementInGrid = (className) => {
		for (let row = 0; row < this.state.NUM_ROWS; row++) {
			for (let col = 0; col < this.state.NUM_COLS; col++) {
				const nodeClass = this.getNodeClassName(row, col)
				if (nodeClass !== `node ${className}` && nodeClass !== 'node node-start' && nodeClass !== 'node node-finish') {
					this.updateNodeClassName(row, col, '')
				}
			}
		}
	}

	clearWalls() {
		if (this.state.isRunning) return;
		this.resetElementInGrid('node-visited')
	}

	clearAlgorithmSteps() {
		if (this.state.isRunning) return;
		this.resetElementInGrid('node-wall')
	}

	clearEntireCanvas() {
		if (this.state.isRunning) return;
		this.setState({gridData: this.createGridData()})
		this.resetElementInGrid('')
	}

	renderGrid() {
		const gridData = this.state.gridData
		return (
			// We want to render our <Node /> components here using the a Board Model
			<div className="grid">
				{gridData.map((rowData, rowIndex) => {
					return (
						<div key={rowIndex} className={`row row-${rowIndex}`}>
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
				<div className="userinterface-header">
					<a id="homepageRefresh" className="navbar" href="">
						Pathfinding Visualiser
					</a>
				
				</div>
				<div className="dropdown">
					<button className="dropbtn">Run an Algorithm!</button>
					<div className="dropdown-content">
						<button id="Dijkstra" className="button algorithm-button"
						onClick={() => this.parseAlgorithmChoice("dijkstra")}>
							Djikstra's Algorithm
						</button>
						<button id="AStar" className="button algorithm-button"
						onClick={() => this.parseAlgorithmChoice("A*")}>
							A* Search
						</button>
						<button id="Greedy" className="button algorithm-button"
						onClick={() => this.parseAlgorithmChoice("greedy")}>
							Run Greedy Best-First Search
						</button>
						<button id="Swarm" className="button algorithm-button"
						onClick={() => this.parseAlgorithmChoice("swarm")}>
							Run Swarm Algorithm
						</button>
					</div>
				</div>
				<button id="clear-walls" className="button clear-button"
				onClick={() => this.clearWalls()}>
					Clear Placed Walls!
				</button>
				<button id="clear-algorithm-steps" className="button clear-button"
				onClick={() => this.clearAlgorithmSteps()}>
					Clear Visited Nodes!
				</button>
				<button id="clear-board" className="button clear-button"
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
			<div className="footer">
				Created by James Seymour. Check out my other projects on my Github <a href="https://github.com/james-seymour">here</a>
			</div>
			</>
		)
	}
}





