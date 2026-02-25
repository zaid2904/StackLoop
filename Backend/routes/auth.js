const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const router = express.Router();

// Create Account
router.post("/register", registerUser);

// Sign In
router.post("/login", loginUser);
module.exports = router;
