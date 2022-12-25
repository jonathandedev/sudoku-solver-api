"use strict";

// Imports
const express = require("express");

// Constants
const app = express();
const port = 1604;

// Server Setup
app.listen(port, () => console.log("Listening on port: " + port));

// Receives requests
app.get("/api/solveSudoku", (req, res) => {
    console.log("Received request: Solve sudoku");

    try {
        checkSudokuFormat(req.query.sudoku);
    } catch (err) {
        res.status(400);
        res.send(err);
    }
});

function checkSudokuFormat(sudoku) {
    if (sudoku == null || sudoku == undefined) throw "no sudoku sent";

}