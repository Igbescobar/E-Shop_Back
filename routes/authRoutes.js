const express = require("express");
const userModel = require("../models/userModel");
const { signUp, helloThere } = require("../controllers/authController");

const router = express.Router();

//router.get("/signup", signupView);
router.get("/signup", helloThere);
router.post("/signup", signUp);
router.get("/login", (req, res) => {});
router.post("/login", (req, res) => {});

module.exports = router;
