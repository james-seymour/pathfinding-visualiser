

const generateRandomMazeIndices = (rowCount, colCount, modifier) => {
  const randomIndices = []
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (Math.random() < modifier) {
        const wallIndex = { row: row, col: col }
        randomIndices.push(wallIndex)
      }
    } 
  }
  return randomIndices
}

export { generateRandomMazeIndices }