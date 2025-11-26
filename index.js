const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "We are in !" });
});

// ROUTES

// NO ROUTES
app.all(/.*/, (req, res) => {
  res.json({ message: "Route does not exist" });
});

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
