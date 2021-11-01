"use strict";

var _User = require("../models/User");

var authentication = function authentication(req, res, next) {
  var token = req.cookies.w_auth;

  _User.User.findByToken(token, function (err, user) {
    if (err) throw err;
    if (!user) return res.json({
      isAuth: false,
      error: true
    });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = {
  authentication: authentication
};