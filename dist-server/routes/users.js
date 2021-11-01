"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = require("../models/User");

var _authentication = require("../middleware/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //=================================
//             User
//=================================


router.get("/auth", _authentication.authentication, function (req, res) {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});
router.post("/register", function (req, res) {
  var user = new _User.User(req.body);
  user.save(function (err) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
router.post("/login", function (req, res) {
  _User.User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) return res.json({
      loginSuccess: false,
      message: "Authentication failed, email not found"
    });
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) return res.json({
        loginSuccess: false,
        message: "Wrong password"
      });
      user.generateToken(function (err, user) {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        });
      });
    });
  });
});
router.get("/logout", _authentication.authentication, function (req, res) {
  _User.User.findOneAndUpdate({
    _id: req.user._id
  }, {
    token: "",
    tokenExp: ""
  }, function (err) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).send({
      success: true
    });
  });
});
var _default = router;
exports["default"] = _default;