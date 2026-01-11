const express = require("express");
const router = express.Router();
const axios = require("axios");

////////////////////////////////////////////////
///////////////// API V1 //////////////////////
//////////////////////////////////////////////

// READ ALL CHARACTERS

router.get("/api/v1/characters", async (req, res) => {
  const { name, skip, limit, page } = req.query;

  let getName = name || "";
  let getSkip = skip || 0;
  let getLimit = limit || 100;

  if (page) {
    getLimit = 12;
    getSkip = getLimit * page - 12;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${getLimit}&skip=${getSkip}&name=${getName}`
    );
    // console.log(response.data);
    res.status(201).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
