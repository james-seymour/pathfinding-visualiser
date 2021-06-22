import React, { Component, createContext, useState, useEffect } from 'react'
import { calculateDijkstra } from '../algorithms/dijkstra.js'
import { dfs } from "../algorithms/dfs.js"
import Node from "./Node.js"
import "./Visualiser.css" 
import { getNodesInShortestPathOrder } from '../algorithms/algorithms.js'
import { generateRandomMazeIndices } from '../mazes/randmaze.js'

// Any {} tells the compiler this is JS specific code 

export default class Visualiser extends Component {
	constructor() {
		super();

		const variableNumRows = Math.floor(((window.screen.height - 350) / 25))
		const variableNumCols = Math.floor(((window.screen.width - 200) / 25))
		const variableDefaultStartingPos = [Math.floor(variableNumRows/4) - 1, Math.floor(variableNumCols/4) - 1]
		const variableDefaultEndingPos = [Math.floor(3*variableNumRows/4), Math.floor(3*variableNumCols/4)]

    this.state = {
      gridData: [],
      START_NODE_ROW: variableDefaultStartingPos[0],
			START_NODE_COL: variableDefaultStartingPos[1],
      END_NODE_ROW: variableDefaultEndingPos[0],
      END_NODE_COL: variableDefaultEndingPos[1],
      userPaintingWalls: false,
			userMovingStartNode: false,
			userMovingEndNode: false,
      NUM_ROWS: variableNumRows,
      NUM_COLS: variableNumCols,
			// NUM_ROWS: 15,
      // NUM_COLS: 25,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currentRow: 0,
      currentCol: 0,
			selectedAlgorithm: null,
			animationSpeed: 10,
			animationSpeedLabel: "Medium"
    };
	}

	//Main purple colour: rgb(151, 143, 213)

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

	isStartNode = (row, col) => {
		return (row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL)
	}

	isEndNode = (row, col) => {
		return (row === this.state.END_NODE_ROW && col === this.state.END_NODE_COL)
	}

	isStartOrEndNode = (row, col) => {
		return (this.isStartNode(row, col) || this.isEndNode(row, col))
	}

	getNodeClassName(row, col) {
		return document.getElementById(`node-${row}-${col}`).className
	}

	updateNodeClassName(row, col, className) {
		document.getElementById(`node-${row}-${col}`).className = `node ${className}`
	}

	handleMouseDown(row, col) {
		if (this.state.isRunning) return;
		
		if (this.isStartNode(row, col)) {
			this.setState({ userMovingStartNode: true })
		} else if (this.isEndNode(row, col)) {
			this.setState({ userMovingEndNode: true })
		} else {
			this.setState({ userPaintingWalls: true })
			this.updateNodeClassName(row, col, 'node-wall')
		}
	}
	
	handleMouseEnter(row, col) {
		if (this.state.isRunning || this.isStartOrEndNode(row, col)) return;
		
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

	parseAlgorithmChoice() {
		if (this.state.isRunning) return;
		// Set the state to running!
		this.setState({isRunning: true})
		this.resetElementInGrid('node-wall')

		// Grab some variables that each algorithm needs
		const syncedGrid = this.syncHTMLwithGridData()
		const startNode = this.getStartNode(syncedGrid)
		const endNode = this.getEndNode(syncedGrid)

		switch(this.state.selectedAlgorithm) {
			// Add more cases on here for more implementations
			// Visualiser algorithms do not need the current state of the gridData
			// because they can actually receive this state by calling the update function
			// See dijkstra.js
			case "Dijkstra's Algorithm":
				const dijkstraCalculation = calculateDijkstra(syncedGrid, startNode, endNode)
				const dijkstraShortestPath = getNodesInShortestPathOrder(endNode)
				this.animateAlgorithm(dijkstraCalculation, dijkstraShortestPath)
				// if (endNodeReachable) {this.animateShortestPath(dijkstraCalculation)}
				break;
			case "A* Search":
				const dfsCalculation = dfs(syncedGrid, startNode, endNode)
				const dfsShortestPath = getNodesInShortestPathOrder(endNode)
				this.animateAlgorithm(dfsCalculation, dfsShortestPath)
				break;
			default:

				break;
		}
	}

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    // Dfs currently not working when it cannot find the end node
		for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.state.animationSpeed * i);
      } else {
				setTimeout(() => {
					const node = visitedNodesInOrder[i];
					this.updateNodeClassName(node.row, node.col, 'node node-visited')
				}, this.state.animationSpeed * i);
			}
    }
		const animationTime = this.state.animationSpeed * (visitedNodesInOrder.length + 1) + 50 * (nodesInShortestPathOrder.length + 1)
		setTimeout(() => {
			this.setState({isRunning: false})
		}, animationTime)
		this.setState({gridData: this.syncHTMLwithGridData()})
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
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

	generateRandomMaze = (modifier) => {
		if (this.state.isRunning) return;
		this.clearWalls()
		const randomIndices = generateRandomMazeIndices(this.state.NUM_ROWS, this.state.NUM_COLS, modifier)
		for (const index of randomIndices) {
			if (!this.isStartOrEndNode(index.row, index.col)) {
				this.updateNodeClassName(index.row, index.col, 'node-wall')
			}
		}
	}

	updateAnimationSpeed = (label, timing) => {
		if (this.state.isRunning) return;
		this.setState({ animationSpeed: timing, animationSpeedLabel: label })
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

	renderUserInterface() {
		return (
			<div className="userinterface">
				<a id="homepageRefresh" className="navbar" href="">
					Pathfinding Visualiser
				</a>
				<div className="dropdown">
					<button className="dropbtn">Run an Algorithm!</button>
					<div className="dropdown-content">
						<button id="Dijkstra" className="button algorithm-button"
						onClick={() => this.setState({ selectedAlgorithm: "Dijkstra's Algorithm"})}>
							Djikstra's Algorithm
						</button>
						<button id="AStar" className="button algorithm-button"
						onClick={() => this.setState({ selectedAlgorithm: "A* Search"})}>
							A* Search
						</button>
						<button id="Greedy" className="button algorithm-button"
						onClick={() => this.setState({ selectedAlgorithm: "Greedy Best-First Search"})}>
							Run Greedy Best-First Search
						</button>
						<button id="Swarm" className="button algorithm-button"
						onClick={() => this.setState({ selectedAlgorithm: "Swarm Search"})}>
							Run Swarm Algorithm
						</button>
					</div>
				</div>
				<div className="dropdown">
					<button className="dropbtn">Generate A Maze!</button>
					<div className="dropdown-content">
						<button className="button" onClick={() => {this.generateRandomMaze(0.1)}}>
							Sparse Random: (~10% Coverage)
						</button>
						<button className="button" onClick={() => {this.generateRandomMaze(0.2)}}>
							Normal Random: (~20% Coverage)
						</button>
						<button className="button" onClick={() => {this.generateRandomMaze(0.35)}}>
							Dense Random: (~35% Coverage)
						</button>
						{/* Create more maze buttons here */}
					</div>
				</div>
				<div className="dropdown">
					<button className="dropbtn">Speed: {this.state.animationSpeedLabel}</button>
					<div className="dropdown-content">
						<button className="button" onClick={() => {this.updateAnimationSpeed("Slow", 25)}}>
							Slow
						</button>
						<button className="button" onClick={() => {this.updateAnimationSpeed("Medium", 15)}}>
							Medium
						</button>
						<button className="button" onClick={() => {this.updateAnimationSpeed("Fast", 5)}}>
							Fast
						</button>
						<button className="button" onClick={() => {this.updateAnimationSpeed("Insane", 1)}}>
							Insane
						</button>
					</div>
				</div>
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

	renderLegend() {
		return (
			<div className="legend">
				<button className="visualise-button" onClick={() => {this.parseAlgorithmChoice()}}>
					{this.state.selectedAlgorithm ? 
					`Run ${this.state.selectedAlgorithm}!` : 
					"Choose a search method from the Run an Algorithm menu!"}
				</button>
				
				</div>
		)
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



	// Main Render State
	render() {
		return (		
			<>
			{this.renderUserInterface()}
			{this.renderLegend()}
			{this.renderGrid()}
			<div className="footer">
				Created by James Seymour. The source code for this app and my other projects are on my Github <a href="https://github.com/james-seymour">here</a>
			</div>
			</>
		)
	}
}





