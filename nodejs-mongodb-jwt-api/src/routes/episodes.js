const express = require("express");
const jwt = require('jsonwebtoken');

const episodeSchema = require("../models/episode");
const showtvSchema = require("../models/showtv");
const directorSchema = require("../models/director");
const showtv = require("../models/showtv");

const secret = process.env.JWT_SECRET;

const router = express.Router();

// create episode
router.post("/episode", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const episode = episodeSchema(req.body);
  episode
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

// get specific episode with its director and showtv
router.get("/episode/:_id", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const { _id } = req.params;
  episodeSchema
    .findById(_id)
    .populate({
          path: "showtv",
          model: showtvSchema
      })
    .populate({
        path: "director",
        model: directorSchema
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});


module.exports = router;