const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/auth.js");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", routes);
connectDB();
app.use(cors(), require("cors"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
