const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Todo = require("../../models/Todo");
const Profile = require("../../models/Profile");

// Validation
const validatetodoInput = require("../../validation/todo");

// @route  GET api/todos/test
// @desc   Tests todos route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Todos Works" }));

// @route  GET api/todos
// @desc   Get todos
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatetodoInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Todo.find()
      .sort({ date: -1 })
      .then(todos => res.json(todos))
      .catch(err =>
        res.status(404).json({ notodofound: "No todo found with that id " })
      );
  }
);

// @route  GET api/todos/:id
// @desc   Get todo by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatetodoInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Todo.findById(req.params.id)
      .then(todo => res.json(todo))
      .catch(err =>
        res.status(404).json({ notodofound: "No todo found with that id " })
      );
  }
);

// @route  POST api/todos
// @desc   Create todo
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatetodoInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newtodo = new Todo({
      user: req.user.id,
      task: req.body.task,
      complete: req.body.complete,
      duedate: req.body.duedate,
      list: req.body.list,
      notes: req.body.notes
    });

    newtodo.save().then(todo => res.json(todo));
  }
);

// @route  DELETE api/todos/:id
// @desc   Delete todo by id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Todo.findById(req.params.id)
        .then(todo => {
          //Check for todo owner
          if (todo.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          todo.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ todonotfound: "No todo found" }));
    });
  }
);

//export router for server.js to sense it
module.exports = router;
