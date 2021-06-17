import React, { useState } from 'react'

const Node = (props) => {
    // Setup unique identifying strings for Node html elements
    const idString = `node-${props.row}-${props.col}`
    const specialNode = props.isStart ? "start" : props.isFinish ? "finish" : props.isWall ? "wall" : ""
    return (
        <div id={idString} className={specialNode}
        onMouseDown={() => props.onMouseDown(props.row, props.col)}
        onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
        onMouseUp={() => props.onMouseUp()}
        >
        </div>
    )
}

export default Node





