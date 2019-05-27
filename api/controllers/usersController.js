"use strict";

const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
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

const addReq = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friend_requests: req.body } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getReqs = function(req, res) {
  User.findById(req.params.userId)
    .select("friend_requests -_id")
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const addFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.reqId } },
    { new: true }
  )
    .then(user =>
      user.update(
        { $pull: { friend_requests: { id: req.params.reqId } } },
        { new: true }
      )
    )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.reqId },
        { $push: { friends: req.params.userId } },
        { new: true }
      )
    )
    .then(() => res.json({ message: "The friend successfully added" }))
    .catch(err => res.send(err));
};

const rejReq = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friend_requests: { id: req.params.reqId } } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getFriends = function(req, res) {
  User.findById(req.params.userId)
    .populate("friends")
    .then(friends => res.json(friends))
    .catch(err => res.send(err));
};

const deleteFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      )
    )
    .then(() => res.json({ message: "The friend successfully deleted" }))
    .catch(err => res.send(err));
};

const register = function(req, res) {
  var new_user = new User(req.body);
  new_user.hash_password = bcrypt.hashSync(req.body.password, 10);
  new_user
    .save()
    .then(user => {
      user.hash_password = undefined;
      return res.json(user);
    })
    .catch(err => res.send(err));
};

const signIn = function(req, res) {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password."
        });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, name: user.name, _id: user._id },
          "RESTFULAPIs"
        )
      });
    })
    .catch(err => res.send(err));
};

const loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addReq,
  getReqs,
  addFriend,
  rejReq,
  getFriends,
  deleteFriend,
  register,
  signIn,
  loginRequired
};
