async function validateLoginData(req, res, next) {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Login Data validation error" });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unknown error" });
  }
}

module.exports = validateLoginData;
