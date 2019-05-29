"use strict";

module.exports = function(app) {
  var authHandlers = require("../controllers/authСontroller.js"),
    usersList = require("../controllers/usersController"),
    friendsList = require("../controllers/friendsController.js"),
    passport = require("passport"),
    loginRequired = passport.authenticate("jwt", { session: false });

  // auth
  app.route("/auth/register").post(authHandlers.register); // registration
  app.route("/auth/sign_in").post(authHandlers.signIn); // sing in

  // users
  app.route("/users").get(loginRequired, usersList.getUsers); // view all users

  app
    .route("/users/:userId")
    .get(loginRequired, usersList.getUser) // view user
    .put(loginRequired, usersList.updateUser) // update information about user
    .delete(loginRequired, usersList.deleteUser) // delete the user

    // friends
    .patch(loginRequired, friendsList.addReq); // receive auth user id, who want to be friend

  app.route("/friend_requests").get(loginRequired, friendsList.getReqs); // view friend requests
  app
    .route("/friend_requests&:reqId")
    .patch(loginRequired, friendsList.addFriend) // accept friend request
    .delete(loginRequired, friendsList.rejReq); // reject friend request

  app.route("/friends").get(loginRequired, friendsList.getFriends); // view friends
  app
    .route("/friends&:friendId")
    .delete(loginRequired, friendsList.deleteFriend); // delete the friend via id
};
