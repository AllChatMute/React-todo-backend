require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

function registerController(req, res) {
  try {
    const token = jwt.sign(req.body, SECRET, { expiresIn: "1h" });
    res.cookie("auth", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    });

    res.send(req.cookies.auth);
  } catch (error) {
    console.log(error);
  }
}

module.exports = registerController;
