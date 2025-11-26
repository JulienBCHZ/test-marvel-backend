const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = "9xe2YtURnodSMq9J";

router.get("/character/:characterId", async (req, res) => {
  const id = req.params.characterId;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${apiKey}`
    );
    console.log("CHARAC :", response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
