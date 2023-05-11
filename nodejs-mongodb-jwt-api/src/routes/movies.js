const express = require("express");
const movieSchema = require("../models/movie");
const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = process.env.JWT_SECRET;

// create movie
router.post("/movie", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const movie = movieSchema(req.body);
  movie
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

// get all movies
router.get("/movies", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  movieSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

// get a movie
router.get("/movies/:idMovie", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const { idMovie } = req.params;
  movieSchema
    .find()
    .where('idMovie').equals(idMovie)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

// get filter the movies an ascending alphabetical order
router.get("/movie/:title", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const { title } = req.params;
  movieSchema
    .find({ title: new RegExp('^' + title, 'i') })
    .sort({ title: 1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

module.exports = router;
