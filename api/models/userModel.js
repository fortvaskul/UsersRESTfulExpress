"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: "!Please enter the username"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  hobby: String,
  responsibility: String,
  friend_requests: [],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("User", userSchema);
