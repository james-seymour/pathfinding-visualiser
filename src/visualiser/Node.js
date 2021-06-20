import React, { useState, useEffect } from 'react'
import "./Node.css"

const Node = (props) => {
    // console.log("re-rendering")
    // Setup unique identifying strings for Node html elements
    return (
        <div id={`node-${props.nodeData.row}-${props.nodeData.col}`} className={`node ${props.nodeData.isWall ? "node-wall" : ""}`}
        onMouseDown={() => props.onMouseDown(props.nodeData.row, props.nodeData.col)}
        onMouseEnter={() => props.onMouseEnter(props.nodeData.row, props.nodeData.col)}
        onMouseUp={() => props.onMouseUp()}
        >
        </div>
    )
}

const nodePropsAreEqual = (prevProps, newProps) => {
    const prevKeys = Object.keys(prevProps.nodeData)
    const newKeys = Object.keys(newProps.nodeData)

    
    // console.log("keys")
    // if (prevKeys.length !== newKeys.length) {
    //     return false;
    // }

    for (let key of prevKeys) {
        if (prevProps.nodeData[key] !== newProps.nodeData[key]) {
            return false;
        }
    }

    return true;
}


export default Node





