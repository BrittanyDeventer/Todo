const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateTodoInput(data) {
  let errors = {};

  data.task = !isEmpty(data.task) ? data.task : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  if (Validator.isEmpty(data.task)) {
    errors.task = "task field is required";
  }

  if (!Validator.isLength(data.notes, { max: 300 })) {
    errors.notes = "Notes cannot exceed 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
