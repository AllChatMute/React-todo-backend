const User = require("../models/User");

async function createTodo(req, res) {
  try {
    const email = req.email;

    const user = await User.findOne({ email });
    const todos = user.todos;
    todos.push({
      id: todos[todos.length - 1]?.id || 1,
      ...req.body,
    });
    console.log(user);

    await User.findOneAndUpdate(user, todos);
    res.status(201).send("Added task");
  } catch (error) {
    console.log(error);
    res.status(400).send("Unknown error");
  }
}

module.exports = { createTodo };
