const mongoose = require("mongoose");
const episodeSchema = require("./episode");

const showtvSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  episodes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'episodeSchema'
  }],
  seasons:{
    type: Number,
    required: true
  },
  actors: {
    type: Array,
    required: true

  }
});

module.exports = mongoose.model('Showtv', showtvSchema);