const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;

  next();
});

module.exports = Mongoose.model("User", userSchema);
