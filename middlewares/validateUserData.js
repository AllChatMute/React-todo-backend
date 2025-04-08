const connectToDataBase = require("../db");
const User = require("../models/User");

const regex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

async function validateUserData(req, res, next) {
  try {
    await connectToDataBase();
    const { name, email, password } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "User Data validation error" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!regex.test(email)) {
      return res.status(400).json({ message: "Email validation error" });
    }

    if (!user) {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = validateUserData;
