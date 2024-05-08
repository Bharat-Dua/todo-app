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

const updateTodoFormController = async (req, res) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);
    res.render("updateTodo", { title: "update Todo", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoFormController = (req, res) => {
  try {
    const { id } = req.params;

    res.render("deleteTodo", { title: "delete Todo", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTodoController = async (req, res) => {
  try {
    const { id, confirm } = req.query;
    if (confirm === "yes") {
      await Todo.findByIdAndDelete(id)
    }
    // await Todo.remove({ _id: id });
    res.redirect("/");
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
};

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todos = await Todo.findById(id);
    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todos.title = title ? title : todos.title;
    todos.description = description ? description : todos.description;
    await todos.save();
    res.redirect(`/`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoFormController,
  addTodoController,
  updateTodoController,
  deleteTodoController,
};
