const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  task: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  duedate: {
    type: Date
  },
  list: {
    type: String
  },
  notes: {
    type: String,
    max: 300
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
