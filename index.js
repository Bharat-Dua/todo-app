const express = require("express");
const mongoose = require("mongoose");

// init app
const app = express();

// connect to MongoDB database
const connectionUrl = "mongodb://0.0.0.0:27017/todoDb";
mongoose
  .connect(connectionUrl)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err.message));
// view engine
app.set("view engine", "ejs");

// listen server

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is listening at ${port}`));
