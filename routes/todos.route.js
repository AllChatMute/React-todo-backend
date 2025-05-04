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

todosRouter.use(isAuthed);

todosRouter.get("/", getTodos);
todosRouter.post("/", validateTodo, createTodo);
todosRouter.put("/:id", validateTodo, updateTodo);
todosRouter.delete("/:id", validateTodo, deleteTodo);

module.exports = todosRouter;
