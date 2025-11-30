const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const Favorit = require("../Models/Favorit");
const convertToBase64 = require("../utils/convertToBase64");
const isAuthenticated = require("../middleware/isAuthenticated");

// CREATE FAVORIT
router.post(
  "/user/favorits/add",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    const { title, description, image } = req.body;

    try {
      const favoritToCheck = await Favorit.findOne({ item_title: title });
      if (favoritToCheck) {
        return res.json({
          message: "Already added in favorits",
        });
      }
      // UPLOAD des images dans des assets avec le nom du User et de l'item en favorit
      //   let allCloudinaryResponses = [];
      //   if (req.files) {
      //     for (i = 0; i < req.files.image.length; i++) {
      //       const fileToString = convertToBase64(req.files.image[i]);
      //       const cloudinaryResponse = await cloudinary.uploader.upload(
      //         fileToString,
      //         { asset_folder: `/${req.user.account.username}/${title}` }
      //       );
      //       allCloudinaryResponses.push(cloudinaryResponse);
      //     }
      //   }

      //  MODEL :     item_title: String,
      //   item_description: String,
      const newFavorit = new Favorit({
        item_title: title,
        item_description: description,
        item_image: image,
        owner: req.user._id,
      });

      await newFavorit.save();
      const newFavoriteSave = await newFavorit.populate("owner", "account");

      res
        .status(201)
        .json({ message: "Add in favorits", data: newFavoriteSave });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// READ FAVORITS
router.get("/user/favorits", isAuthenticated, async (req, res) => {
  try {
    const favorits = await Favorit.find().populate("owner", "account");

    const count = await Favorit.countDocuments();
    // res.json({ message: "Wait..." });
    res.json({ count: count, favorits: favorits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ BY ID
router.get("/user/favorit/:id", isAuthenticated, async (req, res) => {
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
router.get("/user/favorit/delete/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("ID :", req.params);

    const id = req.params.id;

    const favoritDeleted = await Favorit.findByIdAndDelete(id);

    res.status(201).json({ message: "Favorit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
