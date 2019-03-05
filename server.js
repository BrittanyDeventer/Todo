const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Route files
const todos = require("./routes/api/todos");
const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test
// app.get("/", (req, res) => res.send("Hello! World!"));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/todos", todos);

const port = process.env.PORT || 5000; //run on port 5000 until we deploy
app.listen(port, () => console.log(`Server running on port ${port}`));
