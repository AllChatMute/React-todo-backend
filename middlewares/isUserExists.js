const User = require("../models/User");

async function isUserExists(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unknown error" });
  }
}

module.exports = isUserExists;
