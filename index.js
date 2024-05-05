const { timeStamp } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");
const { title } = require("process");

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

// schema

const todoSchema = mongoose.Schema(
  {
    todoTitle: {
      type: String,
      required: true,
    },
    todoDesc: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

const Todo = mongoose.model("todo", todoSchema);

// app routes
// show all todo
app.get("/", (req, res) => {
  try {
    res.render("index", { title: "All Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// add new todo

app.get("/add-todo", (req, res) => {
  try {
    res.render("newTodo", { title: "add Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  update todo

app.get("/update-todo", (req, res) => {
  try {
    res.render("updateTodo", { title: "update Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete todo

app.get("/delete-todo", (req, res) => {
  try {
    res.render("deleteTodo", { title: "delete Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listen server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening at ${port}`));
