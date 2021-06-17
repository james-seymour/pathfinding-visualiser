import React, { useState } from 'react'
import "./Node.css"

const Node = (props) => {
    // Setup unique identifying strings for Node html elements
    const idString = `node-${props.row}-${props.col}`
    const specialNode = props.isStart ? "node-start" : props.isFinish ? "node-finish" : props.isWall ? "node-wall" : ""
    return (
        <div id={idString} className={`node ${specialNode}`}
        //onMouseDown={() => props.onMouseDown(props.row, props.col)}
        // onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
        // onMouseUp={() => props.onMouseUp()}
        >
        </div>
    )
}

export default Node





