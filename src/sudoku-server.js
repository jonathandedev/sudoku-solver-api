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
        checkSudokuFormat(req.params.sudoku);
    } catch (err) {
        res.status(400);
        res.send(err);
    }
});

function checkSudokuFormat(sent) {
    if (sent == null || sent == undefined) throw "no sudoku sent";

    const sudoku = JSON.parse(sent);

    if (sudoku.puzzle == undefined || sudoku.puzzle == null) throw "the sudoku does not contain a puzzle";
    if (sudoku.puzzle.trim().length != 81) throw "the sudoku puzzle is not the right size"
}