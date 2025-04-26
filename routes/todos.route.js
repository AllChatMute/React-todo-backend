const express = require("express");
const isAuthed = require("../middlewares/isAuthed");
const validateTodo = require("../middlewares/validateTodo");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} = require("../controllers/todos.controller");

const todosRouter = express.Router();

todosRouter.use(validateTodo);
todosRouter.use(isAuthed);

todosRouter.get("/", getTodos);
todosRouter.post("/", createTodo);
todosRouter.put("/:id", updateTodo);
todosRouter.delete("/:id", deleteTodo);

module.exports = todosRouter;
