const express = require("express");
const isAuthed = require("../middlewares/isAuthed");
const validateTodo = require("../middlewares/validateTodo");
const { createTodo } = require("../controllers/todos.controller");

const todosRouter = express.Router();

todosRouter.use(validateTodo);

todosRouter.post("/", isAuthed, createTodo);

module.exports = todosRouter;
