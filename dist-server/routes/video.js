"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

var _Video = require("../models/Video");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  },
  fileFilter: function fileFilter(req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== '.mp4' || ext !== '.mov') {
      return cb(res.status(400).end('only mov, mp4 is allowed'), false);
    }

    cb(null, true);
  }
});

var maxSize = 209715200.0;
var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: maxSize
  }
}).single("file"); //=================================
//             Video
//=================================

router.post("/uploadfiles", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        err: err
      });
    }

    var fileExt = res.req.file.originalname.split('.').pop();

    if (fileExt === 'mp4' || fileExt === 'mov') {
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename
      });
    } else {
      return res.status(400).end('only mov, mp4 is allowed');
    }
  });
});
router.post("/thumbnail", function (req, res) {
  var thumbsFilePath = "";
  var fileDuration = "";

  _fluentFfmpeg["default"].ffprobe(req.body.filePath, function (err, metadata) {
    // console.dir(metadata);
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  (0, _fluentFfmpeg["default"])(req.body.filePath).on('filenames', function (filenames) {
    // console.log('Will generate ' + filenames.join(', '))
    thumbsFilePath = "uploads/thumbnails/" + filenames[0];
  }).on('end', function () {
    console.log('Screenshots taken');
    return res.json({
      success: true,
      thumbsFilePath: thumbsFilePath,
      fileDuration: fileDuration
    });
  }).screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count: 1,
    folder: 'uploads/thumbnails',
    size: '256x256',
    // %b input basename ( filename w/o extension )
    filename: 'thumbnail-%b.png'
  });
});
router.get("/getVideos", function (req, res) {
  _Video.Video.find().populate('writer').exec(function (err, videos) {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      videos: videos
    });
  });
});
router.post("/uploadVideo", function (req, res) {
  var video = new _Video.Video(req.body);
  video.save(function (err, video) {
    if (err) return res.status(400).json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true,
      video: video
    });
  });
});
router.post("/getVideo", function (req, res) {
  _Video.Video.findOne({
    "_id": req.body.videoId
  }).populate('writer').exec(function (err, video) {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      video: video
    });
  });
});
var _default = router;
exports["default"] = _default;