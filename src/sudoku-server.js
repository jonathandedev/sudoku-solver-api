"use strict";

// Imports
const express = require("express");

// Constants
const app = express();
const port = 1604;

// Server Setup
app.listen(port, () => console.log("Listening on port: " + port));

// Receives requests
app.get("/api/solveSudoku/:sudoku", (req, res) => {
    console.log("Received request: Solve sudoku");

    try {
        // Parse the client input
        const sudoku = JSON.parse(req.params.sudoku);

        // Check, solve and send solution
        checkSudokuFormat(sudoku);
        let solution = solveSudoku(sudoku);
        res.send(solution);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send(err);
    }
});

/**
 * Checks the given JSON object isn't null or undefined.
 * The object should have a puzzle attribute describing a sudoku puzzle in a single string.
 * The error thrown is sent to the client.
 * 
 * @param {Object} sudoku the JSON object holding the puzzle string
 */
function checkSudokuFormat(sudoku) {
    if (sudoku == null || sudoku == undefined) throw "no sudoku sent";

    if (sudoku.puzzle == undefined || sudoku.puzzle == null) throw "the sudoku does not contain a puzzle";
    if (typeof sudoku.puzzle != "string") throw "the sudoku does not contain a puzzle of the right format";

    if (sudoku.puzzle.trim().length != 81) throw "the sudoku puzzle is not the right size"
}

/**
 * Used to convert the puzzle string into a 2D array.
 * The 2D array is then solved and added to a solution object.
 * A boolean of solvable is also added to the solution object.
 * 
 * @param {Object} sudoku the JSON object holding the puzzle string
 * @returns the object holding the solvable boolean and potentially the solution
 */
function solveSudoku(sudoku) {
    // Convert string to 2D array
    let grid = createGrid(sudoku.puzzle);
    // Solve the grid
    let solvable = bruteForce(grid);

    // Create the solution object
    let solution = {
        solvable: solvable
    }
    if (solvable) solution.puzzle = convertGridToString(grid);
    return solution;
}

function convertGridToString(grid) {
    let string = "";
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            string += grid[i][j];
        }
    }
    return string;
}

/**
 * Converts a string of length 81 into a 2D array.
 * 
 * @param {string} puzzle the string of length 81
 * @returns the 2D array
 */
function createGrid(puzzle) {
    const length = 9;

    let grid = [];
    for (let i = 0; i < length; i++) {
        let row = [];
        for (let j = 0; j < length; j++) {
            let index = (i * length) + j;
            row.push(puzzle.split("")[index]);
        }
        grid.push(row);
    }

    return grid;
}

/**
 * A recursive algorithm used to brute force solve a sudoku puzzle using backtracking.
 * 
 * @param {Array} grid the 2D array representation of the sudoku 
 * @returns a boolean on whether the puzzle is solvable
 */
function bruteForce(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                for (let num = 1; num <= 9; num++) {
                    if (valid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (bruteForce(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

/**
 * Determines whether a number inputted into a sudoku would a allowed based on standard rules.
 * 
 * @param {Array} grid the 2D array representation of the sudoku
 * @param {*} row the current row
 * @param {*} col the current column
 * @param {*} num the number to be inserted
 * @returns whether the given number can be inserted
 */
function valid(grid, row, col, num) {
    // Checks the same number isn't in the current row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] == num) return false;
    }
    // Checks the same number isn't in the current column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] == num) return false;
    }

    // Checks the smaller 3x3 doesn't contain the same number
    for (let r = Math.floor(row / 3) * 3; r < Math.floor(row / 3) * 3 + 3; r++) {
        for (let c = Math.floor(col / 3) * 3; c < Math.floor(col / 3) * 3 + 3; c++) {
            if (grid[r][c] == num) return false;
        }
    }

    return true;
}