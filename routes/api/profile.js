const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route  GET api/profile
// @desc   Get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // PROTECTED ROUTE
  (req, res) => {
    const errors = {
      noprofile: "There is no profile for this user"
    };

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get("/all", (req, res) => {
  Profile.find()
    .poplulate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route  POST api/profile
// @desc   Create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.tasksperday) profileFields.tasksperday = req.body.tasksperday;
    if (req.body.tasksperweek)
      profileFields.tasksperweek = req.body.tasksperweek;
    if (req.body.taskspermonth)
      profileFields.taskspermonth = req.body.taskspermonth;
    if (req.body.dailygoalreached)
      profileFields.dailygoalreached = req.body.dailygoalreached;
    if (req.body.weeklygoalreached)
      profileFields.weeklygoalreached = req.body.weeklygoalreached;
    if (req.body.monthlygoalreached)
      profileFields.monthlygoalreached = req.body.monthlygoalreached;
    if (req.body.quoteoftheday)
      profileFields.quoteoftheday = req.body.quoteoftheday;
    if (req.body.date) profileFields.date = req.body.date;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create profile
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route  DELETE api/profile
// @desc   Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//export router for server.js to sense it
module.exports = router;
