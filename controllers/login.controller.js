require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.SECRET_KEY;

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const foundedUser = await User.findOne({ email, password }).lean();

    if (foundedUser?.email === email && foundedUser?.password === password) {
      const token = jwt.sign(foundedUser, SECRET, { expiresIn: "1h" });

      res.cookie("auth", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
      });

      res.send(token);
    } else {
      res.status(400).send({ message: "Invalid userdata" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = loginController;
