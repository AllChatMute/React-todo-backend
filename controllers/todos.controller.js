const User = require("../models/User");

async function createTodo(req, res) {
  try {
    const email = req.email;
    const todos = (await User.findOne({ email })).todos;

    const newID =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    const newTodo = {
      id: newID,
      ...req.body,
    };

    await User.findOneAndUpdate(
      { email },
      { $push: { todos: newTodo } },
      { new: true }
    );

    return res.status(201).json({ message: "Task added" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unknown error" });
  }
}

async function updateTodo(req, res) {
  try {
    const email = req.email;
    const id = req.params.id;

    const todos = (await User.findOne({ email })).todos;
    const todoIndex = todos.findIndex((item) => item.id === +id);

    const updatedTodo = {
      id,
      ...req.body,
    };
    if (todos.find((item) => item.id === +id)) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            [`todos.${todoIndex}`]: updatedTodo,
          },
        },
        { new: true }
      );

      return res.json({ message: "Task updated" });
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unknown error" });
  }
}

async function deleteTodo(req, res) {
  try {
    const email = req.email;
    const id = +req.params.id;

    const todos = (await User.findOne({ email })).todos;

    if (todos.find((item) => item.id === +id)) {
      await User.findOneAndUpdate(
        { email },
        {
          $pull: {
            todos: { id },
          },
        },
        { new: true }
      );

      return res.status(204).json({ message: "Deleted" });
    } else {
      return res.status(400).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unknown error" });
  }
}
module.exports = { createTodo, updateTodo, deleteTodo };
