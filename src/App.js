import React, { Fragment, useState } from "react"


// Helper function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// Child component to render a square on the game board
const Square = ({ value, onSquareClick }) => {
  // onClick={onSquareClick} - "callback props" or "function props" in React, when a parent component passes a function prop to the child component.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// Board component to render the game board
const Board = ({squares, xIsNext, onPlay}) => {

  const clickHandler = (i) => {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice() // returns new array
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }

    onPlay(nextSquares)
  }

  // Determine the game status
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  // Render the game board using the Square component
  return (
    <Fragment>
      <div>{status}</div> {/* Game status */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => clickHandler(0)} /> {/* Square 1 */}
        <Square value={squares[1]} onSquareClick={() => clickHandler(1)} /> {/* Square 2 */}
        <Square value={squares[2]} onSquareClick={() => clickHandler(2)} /> {/* Square 3 */}
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => clickHandler(3)} /> {/* Square 4 */}
        <Square value={squares[4]} onSquareClick={() => clickHandler(4)} /> {/* Square 5 */}
        <Square value={squares[5]} onSquareClick={() => clickHandler(5)} /> {/* Square 6 */}
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => clickHandler(6)} /> {/* Square 7 */}
        <Square value={squares[7]} onSquareClick={() => clickHandler(7)} /> {/* Square 8 */}
        <Square value={squares[8]} onSquareClick={() => clickHandler(8)} /> {/* Square 9 */}
      </div>
    </Fragment>
  )
}

// A component representing the entire game, including board and move history.
const Game = () => {
  // Initialize game state with history and current move number
  const [history, setHistory] = useState([Array(9).fill(null)]) // initially -> [ [ele=null, ele=null, ...] ]
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove] // initially -> [ele=null, ele=null, ele=null ...]

  // Handle a player making a move
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] // create a new history. end option is non-inclusive in slice(start, end)
    setHistory(nextHistory) // update the history state
    setCurrentMove(nextHistory.length - 1)
  }
  
  // Handle a player jumping to a previous move - will cause the game component to re-render, causing the board component to re-render a new state
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove) 
  }

  // Generate the list of move buttons to display in the game history
  const moves = history.map((ele, index) => {
    let description
    if (index > 0) {
      description = 'Go to index #' + index
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  })
  
  // Render the game board and move history
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game