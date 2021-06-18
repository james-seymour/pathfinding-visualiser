import React, { useState } from 'react'
import "./Node.css"

const Node = (props) => {
    // Setup unique identifying strings for Node html elements
    const idString = `node-${props.row}-${props.col}`
    const specialNode = props.isStart ? "node-start" : props.isFinish ? "node-finish" : props.isWall ? "node-wall" : ""
    const renderCount = React.useRef(0)

    const [vars, updateVars] = React.useState({})
    console.log("Re-rendered Node")
    // 
    React.useEffect (() => {
        renderCount.current = renderCount.current + 1
        //console.log(renderCount)
    }, [props.isWall, props.isVisited])
    
    return (
        <div id={idString} className={`node ${specialNode}`}
        onMouseDown={() => props.onMouseDown(props.row, props.col)}
        onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
        onMouseUp={() => props.onMouseUp()}
        >
        </div>
    )
}

export default React.memo(Node)





