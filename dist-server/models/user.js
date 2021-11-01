"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var saltRounds = 10;

var userSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    "default": 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    _bcryptjs["default"].genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      _bcryptjs["default"].hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  _bcryptjs["default"].compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  var token = _jsonwebtoken["default"].sign(user._id.toHexString(), 'secret');

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  _jsonwebtoken["default"].verify(token, 'secret', function (err, decode) {
    user.findOne({
      "_id": decode,
      "token": token
    }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

var User = _mongoose["default"].model('User', userSchema);

module.exports = {
  User: User
};