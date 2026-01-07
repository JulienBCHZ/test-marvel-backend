const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const Favorit = require("../Models/Favorit");
const convertToBase64 = require("../utils/convertToBase64");
const isAuthenticated = require("../middleware/isAuthenticated");

////////////////////////////////////////////////
///////////////// API V1 //////////////////////
//////////////////////////////////////////////

// CREATE FAVORIT

router.post("api/v1/user/favorits/add", isAuthenticated, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const favoritToCheck = await Favorit.findOne({ item_title: title });
    if (favoritToCheck) {
      return res.json({
        message: "Already added in favorits",
      });
    }

    const newFavorit = new Favorit({
      item_title: title,
      item_description: description || "",
      item_image: image || "",
      owner: req.user._id,
    });

    await newFavorit.save();
    const newFavoriteSave = await newFavorit.populate("owner", "account");

    res.status(201).json({ message: "Add in favorits", data: newFavoriteSave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ FAVORITS

router.get("api/v1/user/favorits", isAuthenticated, async (req, res) => {
  try {
    const favorits = await Favorit.find({ owner: req.user._id }).populate(
      "owner",
      "account"
    );

    const count = await Favorit.countDocuments();
    // res.json({ message: "Wait..." });
    res.json({ count: count, favorits: favorits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ BY ID

router.get("api/v1/user/favorit/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("ID :", req.params);

    const id = req.params.id;

    const favorit = await Favorit.findById(id).populate("owner", "account");

    res.status(201).json(favorit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ BY ID AND DELETE

router.delete(
  "api/v1/user/favorit/delete/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      console.log("ID :", req.params);

      const id = req.params.id;

      const favoritDeleted = await Favorit.findByIdAndDelete(id);

      res.status(201).json({ message: "Favorit deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
