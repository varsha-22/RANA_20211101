"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

var videoSchema = _mongoose["default"].Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  category: {
    type: String
  },
  filePath: {
    type: String
  },
  views: {
    type: Number,
    "default": 0
  },
  duration: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, {
  timestamps: true
});

var Video = _mongoose["default"].model('Video', videoSchema);

module.exports = {
  Video: Video
};