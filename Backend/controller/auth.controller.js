const User = require("../model/user.model.js");
const jwt = require("jsonwebtoken");

// 🔐 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ============================
// ✅ REGISTER USER
// ============================
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// ✅ LOGIN USER
// ============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "This fields are requied" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(user);
    if (password != user.password) {
      return res.status(404).json({ message: "Password is incorrect" });
    }
    const token = generateToken(user._id);
    return res
      .status(200)
      .json({ message: "user is LoggedIn", user: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
