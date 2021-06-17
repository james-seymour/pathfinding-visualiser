import React, { useState } from 'react'
import Visualiser from "../visualiser/Visualiser.js"

export default function UserInterface(props) {
    
    return (
        <div className="userinterface">   
            <button id="djikstra"
            onClick={props.clicked}>
                Run Djikstra's Algorithm
            </button>
        </div>

    )
}