const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  res.status(404).json({ message: "Route does not exist" });
});

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
