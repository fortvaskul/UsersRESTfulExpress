var mongoose = require("mongoose"),
  User = mongoose.model("User"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  config = require("../config/config");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
  passReqToCallback: true
};

module.exports = new JwtStrategy(opts, function(req, jwt_payload, done) {
  User.findById(jwt_payload.id, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      req.user = user;
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
