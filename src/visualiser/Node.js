import React, { useState } from 'react'
import "./Node.css"

const Node = (props) => {
    // Setup unique identifying strings for Node html elements
    const idString = `node-${props.nodeData.row}-${props.nodeData.col}`
    const specialNode = props.nodeData.isWall ? "node-wall" : ""

    return (
        <div id={idString} className={`node ${specialNode}`}
        onMouseDown={() => props.onMouseDown(props.nodeData.row, props.nodeData.col)}
        onMouseEnter={() => props.onMouseEnter(props.nodeData.row, props.nodeData.col)}
        onMouseUp={() => props.onMouseUp()}
        >
        </div>
    )
}

export default React.memo(Node)





