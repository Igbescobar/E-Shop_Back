const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.validatePassword = function (userPassword) {
  return bcrypt.compareSync(userPassword, this.password);
};

userSchema.methods.signToken = function () {
  const { _id, username, email, role } = this;
  const payload = { _id, username, email, role };

  const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "6h",
  });

  return authToken;
};

module.exports = Mongoose.model("User", userSchema);
