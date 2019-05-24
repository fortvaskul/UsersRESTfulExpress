"use strict";
module.exports = function(app) {
  var usersList = require("../controllers/usersController");

  // users Routes
  app
    .route("/users")
    .get(usersList.getUsers)
    .post(usersList.createUser);

  app
    .route("/users/:userId")
    .get(usersList.getUser)
    .put(usersList.updateUser)
    .delete(usersList.deleteUser)
    // receive user id, who wanna be friend
    .patch(usersList.addReq);

  app.route("/users/:userId/friend_requests").get(usersList.getReqs);
  app
    .route("/users/:userId/friend_requests&:reqId")
    .patch(usersList.addFriend) // accept a friend request
    .delete(usersList.rejReq);

  app.route("/users/:userId/friends").get(usersList.getFriends);
  app.route("/users/:userId/friends&:friendId").delete(usersList.deleteFriend); // delete the friend
};
