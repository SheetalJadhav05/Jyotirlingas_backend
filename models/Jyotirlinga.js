const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },

  description: String,
  significance: String,
  bestTime: String,
  howToReach: String,
  nearbyAttractions: String,

  image: String,
});

module.exports = mongoose.model("Jyotirlinga", schema);
