const mongoose = require("mongoose");
const showtvSchema = require("../models/showtv");

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movies:{
    type: Array,
    required: true,
  },
  showtv: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'showtvSchema'
  }],
});

module.exports = mongoose.model('Actor', actorSchema);