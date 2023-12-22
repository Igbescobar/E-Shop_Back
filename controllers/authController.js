const userModel = require("../models/userModel");

const signUp = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    await userModel.create({ username, email, password });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: ["Email and password are required"] });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ errorMessage: ["User is not registered"] });
    }

    if (user.validatePassword(password)) {
      const authToken = user.signToken();

      res.json({ authToken });
    } else {
      res.status(401).json({ errorMessage: ["Incorrect password"] });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
};
