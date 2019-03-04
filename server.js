const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000; //run on port 5000 until we deploy

app.get("/", (req, res) => res.send("Hello! World!"));

app.listen(port, () => console.log(`Server running on port ${port}`));
