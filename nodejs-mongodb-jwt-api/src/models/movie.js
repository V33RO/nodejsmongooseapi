const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const directorSchema = require("./director");


const movieSchema = mongoose.Schema({
  idMovie: {
    type: String,
    default: uuidv4
  },
  title: {
    type: String,
    required: true,
  },
  director:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'directorSchema'
  },
  gender: {
    type: String,
    required: true
  },
   duration: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  actors: {
    type: Array,
    required: true

  }
});

module.exports = mongoose.model('Movie', movieSchema);