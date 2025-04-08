const express = require("express");

const validateUserData = require("../middlewares/validateUserData");
const registerController = require("../controllers/register.controller");

const authRouter = express.Router();

authRouter.post("/register", validateUserData, registerController);
authRouter.post("/login", (req, res) => {});

module.exports = authRouter;
