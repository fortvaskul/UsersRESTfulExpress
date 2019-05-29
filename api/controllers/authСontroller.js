"use strict";

const mongoose = require("mongoose"),
  User = mongoose.model("User"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config");

function createToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, config.jwtSecret, {
    expiresIn: 31556926 // 1 year in seconds
  });
}

const register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: "You need to send email and password" });
  }

  let newUser = User(req.body);
  newUser
    .save()
    .then(user => res.json(user))
    .catch(() => res.status(400).send({ msg: "The email already exists" }));
};

const signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.send({ msg: "The user does not exist" });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          return res.json({
            token: createToken(user)
          });
        }
        return res.status(400).send({ msg: "The password don't match." });
      });
    })
    .catch(err => res.send(err));
};

module.exports = {
  register,
  signIn
};
