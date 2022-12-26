"use strict";


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