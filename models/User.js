const mongoose = require("mongoose");

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

        return !user;
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
    match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    minlength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
