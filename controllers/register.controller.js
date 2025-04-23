require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.SECRET_KEY;

async function registerController(req, res) {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };

    await User.insertOne({ username: req.body.username, ...newUser });

    const token = jwt.sign(newUser, SECRET, { expiresIn: "1h" });

    res.cookie("auth", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    });

    res.status(201).send(token);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = registerController;
