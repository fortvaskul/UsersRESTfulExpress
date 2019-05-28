"use strict";

const mongoose = require("mongoose"),
  User = mongoose.model("User");

const getUsers = function(req, res) {
  User.find({})
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getUser = function(req, res) {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const updateUser = function(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const deleteUser = function(req, res) {
  User.remove({
    _id: req.params.userId
  })
    .then(() => res.json({ message: "The user successfully deleted" }))
    .catch(err => res.send(err));
};


module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser 
};
