const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  tasksperday: {
    type: Number,
    required: true
  },
  tasksperweek: {
    type: Number
  },
  taskspermonth: {
    type: Number
  },
  dailygoalreached: {
    type: Boolean,
    default: false
  },
  weeklygoalreached: {
    type: Boolean,
    default: false
  },
  monthlygoalreached: {
    type: Boolean,
    default: false
  },
  quoteoftheday: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
