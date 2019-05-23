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
    .delete(usersList.deleteUser);
};
