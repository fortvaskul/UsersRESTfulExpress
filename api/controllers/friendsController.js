"use strict";

const mongoose = require("mongoose"),
  User = mongoose.model("User");

const addReq = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friend_requests: { id: req.user._id } } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getReqs = function(req, res) {
  User.findById(req.user._id)
    .select("friend_requests -_id")
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const addFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
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
        { $push: { friends: req.user._id } },
        { new: true }
      )
    )
    .then(() => res.json({ message: "The friend successfully added" }))
    .catch(err => res.send(err));
};

const rejReq = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { friend_requests: { id: req.params.reqId } } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getFriends = function(req, res) {
  User.findById(req.user._id)
    .populate("friends")
    .then(friends => res.json(friends))
    .catch(err => res.send(err));
};

const deleteFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.user._id } },
        { new: true }
      )
    )
    .then(() => res.json({ message: "The friend successfully deleted" }))
    .catch(err => res.send(err));
};

module.exports = {
  addReq,
  getReqs,
  addFriend,
  rejReq,
  getFriends,
  deleteFriend
};
