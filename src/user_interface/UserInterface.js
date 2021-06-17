import React, { useState } from 'react'
import Visualiser from "../visualiser/Visualiser.js"

export default function UserInterface(props) {
    
    function handleClick (value) {
        props.algorithmUpdater(value)
    }

    return (
        <div className="userinterface">   
            <button id="djikstra"
            onClick={handleClick(4)}>
                Run Djikstra's Algorithm
            </button>
        </div>

    )
}