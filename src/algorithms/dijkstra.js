// Main Dijkstra algorithm file

import * as Constants from "../constants"
import { oneDimensionaliseGridNodes, sortNodesByDistance, updateUnvisitedNeighbours, getUnvisitedNeighbours } from "./algorithms"

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


const calculateDijkstra = (grid, startNode, endNode) => {
    const visitedNodesInOrder = []
    startNode.distance = 0
    const unvisitedNodes = oneDimensionaliseGridNodes(grid)

    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        if (closestNode === endNode) return visitedNodesInOrder;

        updateUnvisitedNeighbours(closestNode, grid)
    }

}



// We receive the grid data and need to animate it here
const animateDijkstra = (gridData) => {
    // Iterate through the given grid data and animate
}


export { calculateDijkstra, animateDijkstra }