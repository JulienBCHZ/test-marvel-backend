const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comic/:comicId", async (req, res) => {
  const id = req.params.comicId;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${id}?apiKey=${process.env.API_KEY}`
    );
    console.log("COMIC :", response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
