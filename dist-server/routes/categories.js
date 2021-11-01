"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Categories = require("../models/Categories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //=================================
//             Categories
//=================================


router.post("/categories", function (req, res) {
  var category = new _Categories.Categories(req.body);
  category.save(function (err) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
router.get("/getAllCategories", function (req, res) {
  _Categories.Categories.find().exec(function (err, videos) {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      videos: videos
    });
  });
});
var _default = router;
exports["default"] = _default;