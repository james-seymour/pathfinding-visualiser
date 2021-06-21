// Shared functions for algorithm calculations

const oneDimensionaliseGridNodes = (grid) => {
  const gridNodes = []
  for (const row of grid) {
    for (const node of row) {
      gridNodes.push(node)
    }
  }
  return gridNodes
}

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const updateUnvisitedNeighbours = (node, grid) => {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid)
  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1
    neighbour.previousNode = node
  }
}

const getUnvisitedNeighbours = (node, grid) => {
  const neighbours = []
  const {row, col} = node
  if (row > 0) neighbours.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col])
  if (col > 0) neighbours.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
  return neighbours.filter(neighbour => !neighbour.isVisited)
}

export { oneDimensionaliseGridNodes, sortNodesByDistance, updateUnvisitedNeighbours, getUnvisitedNeighbours }