const mongoose = require("mongoose");
const episodeSchema = require("./episode");
const movieSchema = require("./movie");

const directorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movies:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movieSchema'
  }],
  episodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'episodeSchema'
  }],
});

module.exports = mongoose.model('Director', directorSchema);