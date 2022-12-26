"use strict";
checkBrute();

const client = {
    puzzle:22
}
console.log(JSON.stringify(client));

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
        const sudoku = JSON.parse(req.params.sudoku);

        checkSudokuFormat(sudoku);
        solveSudoku(sudoku);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send(err);
    }
});

function checkSudokuFormat(sudoku) {
    if (sudoku == null || sudoku == undefined) throw "no sudoku sent";

    if (sudoku.puzzle == undefined || sudoku.puzzle == null) throw "the sudoku does not contain a puzzle";
    if (typeof sudoku.puzzle != "string") throw "the sudoku does not contain a puzzle of the right format";

    if (sudoku.puzzle.trim().length != 81) throw "the sudoku puzzle is not the right size"
}

function solveSudoku(sudoku) { 
    let grid = createGrid(sudoku.puzzle);
    bruteForce(grid);
}

function createGrid(puzzle) {
    const length = 9;

    let grid = [];
 
    for (let i=0; i<length; i++) {
        let row = [];
        for (let j=0; j<length; j++) {
            let index = (i*length) + j;
            row.push(puzzle.split("")[index]);
        }
        grid.push(row);
    }

    return grid;
}

function bruteForce(grid, row, col) {
    if (row == 9) return true;
    if (col == 9) bruteForce(grid, row+1, 0);

    if (grid[row][col] == 0) {
        for (let num=1; num<=9; num++) {
            if (valid(grid, row, col, num)) {
                grid[row][col] = num;
                if (bruteForce(grid, row, col+1)) {
                    return true;
                }
            }
        }
        return false;
    }
    bruteForce(grid, row, col+1);
}

function valid(grid, row, col, num) {
    
}

function checkBrute() {
    let grid = [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
             [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
             [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
             [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
             [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
             [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
             [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ];

    console.log(bruteForce(grid, 0, 0));
    console.log(grid);
}