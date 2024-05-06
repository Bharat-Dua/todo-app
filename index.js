const { timeStamp } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");
const bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded({ extended: true }));
// schema

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

// app routes
// show all todo
app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.render("index", { title: "All Todo", todos });
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

app.post("/add-todo", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) throw new Error("Missing fields");
    const newTodo = new Todo({ title, description });
    console.log(newTodo);
    await newTodo.save();
    res.redirect("/");
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
