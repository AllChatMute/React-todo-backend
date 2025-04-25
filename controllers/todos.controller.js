const User = require("../models/User");

async function createTodo(req, res) {
  try {
    const email = req.email;
    const todos = (await User.findOne({ email })).todos;

    const newID =
      todos.length > 0 ? Math.max(...user.todos.map((t) => t.id)) + 1 : 1;

    const newTodo = {
      id: newID,
      ...req.body,
    };

    await User.findOneAndUpdate(
      { email },
      { $push: { todos: newTodo } },
      { new: true }
    );

    res.status(201).send("Added task");
  } catch (error) {
    console.log(error);
    res.status(400).send("Unknown error");
  }
}

module.exports = { createTodo };
