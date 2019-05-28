"use strict";

const mongoose = require("mongoose"),
  User = mongoose.model("User"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config");

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 31556926 // 1 year in seconds
  });
}

const register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }

    let newUser = User(req.body);
    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => res.send(err));
  });
};

const signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ msg: "The user does not exist" });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          return res.json({
            token: createToken(user)
          });
        } else {
          return res.status(400).json({ msg: "The password don't match." });
        }
      });
    })
    .catch(err => res.send(err));
};

module.exports = {
  register,
  signIn
};
