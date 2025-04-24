const mongoose = require("mongoose");
const Task = require("./Task");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Username should contain at least 3 characters"],
    maxlength: [20, "Username can't contain more than 20 characters"],
    validate: {
      validator: async (v) => {
        const user = await mongoose.model("User").find({
          username: v,
        });

        return !user.length;
      },
      message: "Username is busy",
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
