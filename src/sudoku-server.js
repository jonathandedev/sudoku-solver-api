"use strict";

// Imports
const express = require("express");

// Constants
const app = express();
const port = 1604;

app.listen(port, () => console.log("Listening on port: " + port));