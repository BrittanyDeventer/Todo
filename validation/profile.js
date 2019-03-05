const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.tasksperday = !isEmpty(data.tasksperday) ? data.tasksperday : "";

  if (Validator.isEmpty(data.tasksperday)) {
    errors.tasksperday = "How many tasks do you hope to complete everyday?";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
