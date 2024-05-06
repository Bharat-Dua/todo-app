const moment = require("moment");
const Todo = require("../models/Todo");

const homeController = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "All Todo", todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodoFormController = (req, res) => {
  try {
    res.render("newTodo", { title: "add Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoFormController = (req, res) => {
  try {
    res.render("updateTodo", { title: "update Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoFormController = (req, res) => {
  try {
    res.render("deleteTodo", { title: "delete Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addTodoController = async (req, res) => {
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
  }

module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoFormController,
  addTodoController
};
