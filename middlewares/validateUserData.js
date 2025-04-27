const regex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

async function validateUserData(req, res, next) {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "User Data validation error" });
    }

    if (!regex.test(email)) {
      return res.status(400).json({ message: "Email validation error" });
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unknown error" });
  }
}

module.exports = validateUserData;
