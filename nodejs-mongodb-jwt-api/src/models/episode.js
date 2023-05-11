const mongoose = require("mongoose");
const showtvSchema = require("./showtv");
const directorSchema = require("./director");

const episodeSchema = mongoose.Schema({
  title: {
    type: String,
  },
  showtv: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'showtvSchema'
  }],
  director:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'directorSchema'
  }]

});

module.exports = mongoose.model('Episode', episodeSchema);