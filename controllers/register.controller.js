require("dotenv").config();
const User = require("../models/User");

async function registerController(req, res) {
  try {
    const foundedUser = await User.find({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (foundedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(401).json({ message: "Created" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = registerController;
