const mongoose = require("mongoose");

const Favorit = mongoose.model("Favorit", {
  item_title: String,
  item_description: String,
  item_image: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorit;
