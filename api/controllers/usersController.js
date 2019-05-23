"use strict";

var mongoose = require("mongoose"),
  User = mongoose.model("Users");

const getUsers = function(req, res) {
  // User.find({}, function(err, user) {
  //   if (err) res.send(err);
  //   res.json(user);
  // });
  User.find({})
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const createUser = function(req, res) {
  var new_user = new User(req.body);
  // new_user.save(function(err, user) {
  //   if (err) res.send(err);
  //   res.json(user);
  // });
  new_user
    .save()
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getUser = function(req, res) {
  // User.findById(req.params.userId, function(err, user) {
  //   if (err) res.send(err);
  //   res.json(user);
  // });
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const updateUser = function(req, res) {
  // User.findOneAndUpdate(
  //   { _id: req.params.userId },
  //   req.body,
  //   { new: true },
  //   function(err, user) {
  //     if (err) res.send(err);
  //     res.json(user);
  //   }
  // );
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const deleteUser = function(req, res) {
  // User.remove(
  //   {
  //     _id: req.params.userId
  //   },
  //   function(err, user) {
  //     if (err) res.send(err);
  //     res.json({ message: "User successfully deleted" });
  //   }
  // );
  User.remove({
    _id: req.params.userId
  })
    .then(() => res.json({ message: "User successfully deleted" }))
    .catch(err => res.send(err));
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};
