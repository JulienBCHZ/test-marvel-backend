const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// const fileUpload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;

const User = require("../Models/User");

////////////////////////////////////////////////
///////////////// API V1 //////////////////////
//////////////////////////////////////////////

///////////// AUTHENTIFICATION /////////////

// SIGNUP

router.post("/api/v1/auth/signup", async (req, res) => {
  const { email, username, password, newsletter } = req.body;
  // Check des infos
  if (!email) {
    return res.status(403).json({ message: "An email is required" });
  } else if (!username) {
    return res.status(403).json({ message: "A username is required" });
  } else if (!password) {
    return res.status(403).json({ message: "Choose a password" });
  }

  try {
    // Recherche USER
    const userToCheck = await User.findOne({ email: email });
    if (userToCheck) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const usernameToCheck = await User.findOne({
      account: { username: username },
    });
    if (usernameToCheck) {
      return res.status(409).json({ message: "Username unavailable" });
    }

    // Password encryption
    const salt = uid2(16);

    const passwordSalt = password + salt;

    const hash = SHA256(passwordSalt).toString(encBase64);

    const token = uid2(64);

    // créa USER
    const newUser = new User({
      email: email,
      account: { username: username },
      newsletter: newsletter,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      account: { username: newUser.account.username },
    });
  } catch (error) {
    console.log("SIGNUP ERR : ", error);
    res.status(500).json({ message: error.message });
  }
});

// LOGIN

router.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(403).json({ message: "Your email is required" });
  } else if (!password) {
    return res.status(403).json({ message: "Your password is required" });
  }

  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      return res
        .status(401)
        .json({ message: "Check your email and/or password" });
    }

    const passwordSaltLogin = password + userLogin.salt;
    const hashLogin = SHA256(passwordSaltLogin).toString(encBase64);

    if (hashLogin === userLogin.hash) {
      res.json({
        _id: userLogin._id,
        token: userLogin.token,
        account: { username: userLogin.account.username },
      });
    } else {
      return res
        .status(401)
        .json({ message: "Check your email and/or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
