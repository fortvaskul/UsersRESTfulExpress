"use strict";

module.exports = function(app) {
  var usersList = require("../controllers/usersController");

  // auth
  app.route("/auth/register").post(usersList.register);
  app.route("/auth/sign_in").post(usersList.signIn);

  // users Routes
  app.route("/users").get(usersList.getUsers);

  app
    .route("/users/:userId")
    .get(usersList.loginRequired, usersList.getUser)
    .put(usersList.updateUser)
    .delete(usersList.deleteUser)
    // receive user id, who wanna be friend
    .patch(usersList.addReq);

  // friend requests
  app.route("/users/:userId/friend_requests").get(usersList.getReqs);
  app
    .route("/users/:userId/friend_requests&:reqId")
    .patch(usersList.addFriend) // accept a friend request
    .delete(usersList.rejReq);

  //friends
  app.route("/users/:userId/friends").get(usersList.getFriends);
  app.route("/users/:userId/friends&:friendId").delete(usersList.deleteFriend); // delete the friend
};
