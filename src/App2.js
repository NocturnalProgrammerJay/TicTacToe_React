import React, { Fragment, useState } from "react";

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
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
};

// Child component to render a square on the game board
const Square = React.memo(({ value, onSquareClick }) => (
    <button className="square" onClick={onSquareClick}>
        {value}
    </button>
));

// Board component to render the game board
const Board = React.memo(({ squares, xIsNext, onPlay }) => {
    // Determine the game status
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    // Render the game board using the Square component
    return (
        <Fragment>
        <div>{status}</div> {/* Game status */}
        {[0, 3, 6].map((start) => (
            <div className="board-row" key={start}>

            {[start, start + 1, start + 2].map((i) => (
                <Square key={i} value={squares[i]} onSquareClick={() => onPlay(i)} /> // Square
            ))}

            </div>
        ))}
        </Fragment>
    );
});

// A component representing the entire game, including board and move history.
const Game = () => {
    // Initialize game state with history and current move number
    const [history, setHistory] = useState([Array(9).fill(null)]); // initially -> [ [ele=null, ele=null, ...] ]
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]; // initially -> [ele=null, ele=null, ele=null ...]

    // Handle a player making a move
    const handlePlay = (i) => {
        if (currentSquares[i] || calculateWinner(currentSquares)) return;

        const nextSquares = [...currentSquares]; // returns new array
        nextSquares[i] = xIsNext ? "X" : "O";

        setHistory((prev) => [...prev.slice(0, currentMove + 1), nextSquares]); // update the history state
        setCurrentMove((prev) => prev + 1);
    };

    // Handle a player jumping to a previous move - will cause the game component to re-render, causing the board component to re-render a new state
    const jumpTo = (move) => {
        setCurrentMove(move);
    };

    // Generate the list of move buttons to display in the game history
    const moves = history.map((_, move) => {
        const description = move ? `Go to move #${move}` : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
        
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
};
    
export default Game;
