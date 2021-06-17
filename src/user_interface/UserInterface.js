import React, { useState } from 'react'
import Visualiser from "../visualiser/Visualiser.js"
import * as Constants from "../constants.js"
import "./UserInterface.css"

export default function UserInterface(props) {
    
    const handleButtonClick = (value) => {
        props.algorithmUpdater(value)
    }

    return (
        <div className="userinterface">   
            <button id="Dijkstra" className="algorithmButton"
            onClick={() => handleButtonClick(Constants.DIJKSTRA)}>
                Run Djikstra's Algorithm
            </button>
            <button id="AStar" className="algorithmButton"
            onClick={() => handleButtonClick(Constants.ASTAR)}>
                Run A* Algorithm
            </button>
            <button id="Greedy" className="algorithmButton"
            onClick={() => handleButtonClick(Constants.GREEDY)}>
                Run Greedy Best-First Search
            </button>
            <button id="Swarm" className="algorithmButton"
            onClick={() => handleButtonClick(Constants.SWARM)}>
                Run Swarm Algorithm
            </button>
        </div>
    )
}