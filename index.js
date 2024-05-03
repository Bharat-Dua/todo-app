const express = require("express");
const mongoose = require("mongoose");

// init app
const app = express();

// view engine
app.set("view engine", "ejs");

// listen server

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is listening at ${port}`));
