async function validateTodo(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string" || title.length < 1) {
      return res.status(400).json({ message: "Validation error" });
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unknown error" });
  }
}

module.exports = validateTodo;
