const express = require("express");
const jwt = require('jsonwebtoken');
const showtvSchema = require("../models/showtv");

const secret = process.env.JWT_SECRET;

const router = express.Router();

// create showtv
router.post("/showtv", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, secret)
    if(Date.now()>payload.exp){
      return res.status(401).send({error:"token expire"})
    }
  const showtv = showtvSchema(req.body);
  showtv
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(401).send({error:error.message})
  }
});

module.exports = router;