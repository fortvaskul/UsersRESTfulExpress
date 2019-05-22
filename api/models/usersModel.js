"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: "Please enter the username"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  hobby: {
    type: String,
    default: "No hobbies"
  },
  responsibility: {
    type: String,
    default: "No responsibilities"
  }
});

module.exports = mongoose.model("Users", UserSchema);
