const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");

// show all todo
router.get("/", todoControllers.homeController);
// add new todo

router.get("/add-todo", todoControllers.addTodoFormController);

router.post("/add-todo", todoControllers.addTodoController);
//  update todo

router.get("/update-todo", todoControllers.updateTodoFormController);

// delete todo

router.get("/delete-todo", todoControllers.deleteTodoFormController);

router.post("/update-todo/:id", todoControllers.updateTodoController);
module.exports = router;
