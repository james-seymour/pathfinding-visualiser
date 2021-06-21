import React, { useState, PureComponent } from 'react'
import "./Node.css"

export default class Node extends PureComponent {
  render() {
		// console.log("re-rendering")
		return (
			<div
				id={`node-${this.props.nodeData.row}-${this.props.nodeData.col}`}
				className={`node ${this.props.nodeData.isFinish ? 'node-finish' : this.props.nodeData.isStart ? 'node-start' : ''}`}
				onMouseDown={() => this.props.onMouseDown(this.props.nodeData.row, this.props.nodeData.col)}
				onMouseEnter={() => this.props.onMouseEnter(this.props.nodeData.row, this.props.nodeData.col)}
				onMouseUp={() => this.props.onMouseUp()}></div>
		)
	}
}





