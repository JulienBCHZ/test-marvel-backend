const express = require("express");
const router = express.Router();
const axios = require("axios");

// READ ALL CHARACTERS

const apiKey = "9xe2YtURnodSMq9J";

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );
    // console.log(response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
