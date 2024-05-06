const express = require("express");
const Todo = require("../models/Todo");
const moment = require("moment");
const router = express.Router();

// show all todo
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "All Todo", todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// add new todo

router.get("/add-todo", (req, res) => {
  try {
    res.render("newTodo", { title: "add Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-todo", async (req, res) => {
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

router.get("/update-todo", (req, res) => {
  try {
    res.render("updateTodo", { title: "update Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete todo

router.get("/delete-todo", (req, res) => {
  try {
    res.render("deleteTodo", { title: "delete Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;