// Main Dijkstra algorithm file

import * as Constants from "../constants"


/* Probably rework this bit because I'm not sure how efficient it is to run the entire simulation first,
and only then animate everything. If you wanna try it like this, then each node in the board data would
have to have some integer associated with it in the order that the algorithm progresses.
You could then iterate over these integers in the animate function to animate its probably more
efficient to run it in real time. It might be cool to do it this way if there was a skip animation button 
that just solved it straight away. 

Maybe a better alternative is to call the updateGridData method in a loop with a timeout to animate.

Basically the goal is to only re-render the HTML element that is currently working instead of the entire board on every render.
I think react should handle this because we set a key for each 
*/


const calculateDijkstra = (updateGridData) => {
    updateGridData(gridData => {
        // Copy a new version of the 2d grid data array, update this version and then return it to re-render 
        const newGridData = [...gridData]
        
        // Run Dijkstra's algo here
        
        // const startNode = newGridData[Constants.EXAMPLE_START_NODE[0]][Constants.EXAMPLE_START_NODE[1]]
        // const endNode = newGridData[Constants.EXAMPLE_END_NODE[0]][Constants.EXAMPLE_END_NODE[1]]
        // console.log(startNode, endNode)
        
        newGridData[2][1].isWall = true 
        console.log(newGridData[2][1])

        return newGridData
    })
}

// We receive the grid data and need to animate it here
const animateDijkstra = (gridData) => {
    // Iterate through the given grid data and animate
}


export { calculateDijkstra, animateDijkstra }