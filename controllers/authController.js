const userModel = require("../models/userModel");

const helloThere = (req, res, next) => {
  res.send("hello");
};

const signUp = (req, res, next) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  try {
    userModel.create({ username, email, password });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userModel.create({ username, email });
  } catch (error) {}
};

module.exports = {
  helloThere,
  signUp,
  createUser,
};
