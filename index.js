const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname)
console.log(__filename)
// app routes
// show all todo
app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new todo

app.get("/add-todo", (req, res) => {
  try {
    res.render("newTodo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  update todo

app.get("/update-todo", (req, res) => {
  try {
    res.render("updateTodo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete todo

app.get("/delete-todo", (req, res) => {
  try {
    res.render("deleteTodo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listen server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening at ${port}`));
