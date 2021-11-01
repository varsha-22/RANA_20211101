"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categorySchema = _mongoose["default"].Schema({
  name: {
    type: String,
    maxlength: 50
  },
  value: {
    type: String
  }
}, {
  timestamps: true
});

var Categories = _mongoose["default"].model('Categories', categorySchema);

module.exports = {
  Categories: Categories
};