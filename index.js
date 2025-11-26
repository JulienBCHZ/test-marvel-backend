const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const comicsRouter = require("./routes/comics");
const comicRouter = require("./routes/comic");
const charactersRouter = require("./routes/characters");
const characterRouter = require("./routes/character");
const userRouter = require("./routes/user");
const favoritsRouter = require("./routes/favorits");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.json({ message: "We are in !" });
});

// ROUTES

app.use(comicsRouter);
app.use(comicRouter);
app.use(charactersRouter);
app.use(characterRouter);
app.use(userRouter);
app.use(favoritsRouter);

// NO ROUTES
app.all(/.*/, (req, res) => {
  res.json({ message: "Route does not exist" });
});

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
