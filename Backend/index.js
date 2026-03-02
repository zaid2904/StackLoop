const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile.js");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
