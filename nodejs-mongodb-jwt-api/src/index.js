const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const movieRoute = require("./routes/movies");
const episodeRoute = require("./routes/episodes");
const directorRoute = require("./routes/directors");
const showtvRoute = require("./routes/showstv");
const actorRoute = require("./routes/actors");
// settings
const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET

// middlewares

app.use(express.json());
app.use("/api", movieRoute);
app.use("/api", episodeRoute);
app.use("/api", directorRoute);
app.use("/api", showtvRoute);
app.use("/api", actorRoute);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.post("/token", (req, res) => {
  // Get user from Db
  const {id:sub, name}={id:"1",name:"veronica"}
  const token = jwt.sign({
     sub,
     name,
     exp:Date.now() + 60 * 10000
  }, secret)
  res.send({token});
});

// mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
