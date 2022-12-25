"use strict";

// Imports
const express = require("express");

// Constants
const app = express();
const port = 1604;

// Server Setup
app.listen(port, () => console.log("Listening on port: " + port));

app.get("/api/solveSudoku", (req, res) => {
    console.log("Received request: Solve sudoku");

    try {
        throw 0;
    } catch (err) {
        if (err == 0) {
            res.status(400);
            res.send("No Sudoku Sent");
        }
    }
});