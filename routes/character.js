const express = require("express");
const router = express.Router();
const axios = require("axios");

////////////////////////////////////////////////
///////////////// API V1 //////////////////////
//////////////////////////////////////////////

router.get("api/v1/character/:characterId", async (req, res) => {
  const id = req.params.characterId;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}`
    );
    console.log("CHARAC :", response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
