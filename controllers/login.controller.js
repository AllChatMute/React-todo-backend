require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.SECRET;

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const foundedUser = await User.findOne({ email, password });

    if (foundedUser.email === email && foundedUser.password === password) {
      const token = jwt.sign(foundedUser, SECRET, { expiresIn: "1h" });
      res.cookie("auth", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
      });

      res.send(req.cookies.auth);
    }
  } catch (error) {
    console.log(error);
  }
}
