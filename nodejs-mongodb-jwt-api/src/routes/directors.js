const express = require("express");
const directorSchema = require("../models/director");
const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = process.env.JWT_SECRET;

// create director
router.post("/director", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const director = directorSchema(req.body);
  director
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

module.exports = router;