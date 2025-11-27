const express = require("express");
const router = express.Router();
const axios = require("axios");

// READ

router.get("/comics", async (req, res) => {
  const { title, page } = req.query;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );

    console.log("DATA :", response.data);
    // res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ WITH CHARACTER ID

router.get("/comics/:characterId", async (req, res) => {
  const id = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${apiKey}`
    );
    // console.log("PERSO COMICS :", response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
