require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDataBase = require("./db");

const authRouter = require("./routes/auth.route");
const todosRouter = require("./routes/todos.route");

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDataBase();

    app.use("/auth", authRouter);
    app.use("/todos", todosRouter);

    app.listen(PORT, () => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
