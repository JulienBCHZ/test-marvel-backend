const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const convertToBase64 = require("../utils/convertToBase64");

const Favorit = require("../Models/Favorit");

router.post("/favorits/add", async (req, res) => {
  const { title, description } = req.body;
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
