"use strict";
module.exports = function(app) {
  var usersList = require("../controllers/usersController");

  // users Routes
  app
    .route("/users")
    .get(usersList.list_all_users)
    .post(usersList.create_a_user);

  app
    .route("/users/:userId")
    .get(usersList.read_a_user)
    .put(usersList.update_a_user)
    .delete(usersList.delete_a_user);
};
