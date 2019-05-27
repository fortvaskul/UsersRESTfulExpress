"use strict";
var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "!Please enter the username"
  },
  email: {
    type: String,
    required: "!Please enter the email",
    unique: true,
    lowercase: true,
    trim: true
  },
  hash_password: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  age: Number,
  hobby: String,
  responsibility: String,
  friend_requests: [],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

userSchema.methods.comparePassword = password =>
  bcrypt.compareSync(password, this.hash_password);

module.exports = mongoose.model("User", userSchema);
