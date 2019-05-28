"use strict";

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  config = require("./api/config/config"),
  port = process.env.PORT || 3000,
  cors = require("cors"),
  //created model loading
  User = require("./api/models/userModel");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true });

//check mongoose connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});
connection.on("error", err => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware
app.use(passport.initialize());
var passportMiddleware = require("./api/middleware/passport");
passport.use(passportMiddleware);

const routes = require("./api/routes/usersRoutes"); //importing route
routes(app); //register the route

//invalid route
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log("users list RESTful API server started on: " + port);
});
