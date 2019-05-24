"use strict";

var mongoose = require("mongoose"),
  User = mongoose.model("User");

const getUsers = function(req, res) {
  User.find({})
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const createUser = function(req, res) {
  var new_user = new User(req.body);
  new_user
    .save()
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

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addReq,
  getReqs,
  addFriend,
  rejReq,
  getFriends,
  deleteFriend
};
