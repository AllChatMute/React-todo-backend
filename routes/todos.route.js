const express = require("express");
const isAuthed = require("../middlewares/isAuthed");

const todosRouter = express.Router();

todosRouter.get("/", isAuthed, (req, res) => res.send("odfaodos"));

module.exports = todosRouter;
