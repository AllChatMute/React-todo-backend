const express = require("express");

const validateUserData = require("../middlewares/validateUserData");
const validateLoginData = require("../middlewares/validateLoginData");
const isUserExists = require("../middlewares/isUserExists");
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateUserData,
  isUserExists,
  registerController
);
authRouter.post("/login", validateLoginData, loginController);

module.exports = authRouter;
