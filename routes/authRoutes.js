const express = require("express");
const userModel = require("../models/userModel");
const { signUp, helloThere, login } = require("../controllers/authController");

const router = express.Router();

//router.get("/signup", signupView);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/login", (req, res) => {});

module.exports = router;
