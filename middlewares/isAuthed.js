require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

async function isAuth(req, res, next) {
  try {
    const token = req.cookies.auth;

    jwt.verify(token, SECRET, (err, data) => {
      if (err) return res.sendStatus(401);

      req.email = data.email;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
}

module.exports = isAuth;
