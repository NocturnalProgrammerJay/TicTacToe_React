Jamar Andrade - z23486601

# Tic Tac Toe Game with React

This is a simple tic tac toe game built with React. The game features a game board with nine squares, a game status to display the winner or next player, and a move history.

## Installation and Setup

To run this application, you will need to have Node.js and NPM installed on your local machine.

The application should now be running at http://localhost:3000 in your browser.

## Game Functionality

The game allows two players to take turns marking squares on the game board until one player gets three in a row or all squares are filled. Players take turns clicking on a square to place their marker (either X or O). The game status will display the winner if there is one, or the next player's turn.

The game also includes a move history that allows players to jump back to any previous move in the game. The move history is displayed in a list of buttons that show the move number and allow the player to jump to that move by clicking the button.

## React Components

The application is built using the following React components:

- Square: Renders a single square on the game board.
- Board: Renders the game board using the Square component and displays the game status.
- Game: Represents the entire game, including the board and move history. Handles player moves and jump to previous moves.


![ReactTicTacToeDemo](https://user-images.githubusercontent.com/96387037/227813173-11128be1-2e5d-41f6-9df0-f1f97a33b05b.gif)
