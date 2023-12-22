const express = require("express");
const userModel = require("../models/userModel");
const { signUp, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
