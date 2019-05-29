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
    unique: "!The email already exists",
    lowercase: true,
    trim: true
  },
  password: {
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

userSchema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(regPassword, done) {
  bcrypt.compare(regPassword, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
