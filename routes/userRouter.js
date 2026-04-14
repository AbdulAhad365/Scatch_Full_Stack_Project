const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { route } = require("./ownersRouter");
const debug = require("debug")("development:mongoose");
const { isLoggedIn }=require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  res.send("this i am a user");
});

router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;
