const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: String,
  photo: String,
  lastWatering: Number,
  wateringInterval: Number,
  owner: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Plant', plantSchema);
