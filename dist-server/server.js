"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _video = _interopRequireDefault(require("./routes/video.js"));

var _categories = _interopRequireDefault(require("./routes/categories.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Environment Variables
_dotenv["default"].config();

var app = (0, _express["default"])();
console.log('process.env.MONGO_URI', process.env.MONGO_URI);

_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB Connected...');
})["catch"](function (error) {
  console.log('mongoose.connect error: ', error);
  process.exit(-1);
});

_mongoose["default"].connection.on("error", function (err) {
  console.log('mongoose.connection.onerror: ', err);
});

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
console.log("==users==", _users["default"]);
app.use('/api/users', _users["default"]);
app.use('/api/video', _video["default"]);
app.use('/api/categories', _categories["default"]); //use this to show the image you have in node js server to client (react js)

app.use('/uploads', _express["default"]["static"]('uploads')); // Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(_express["default"]["static"]("client/build")); // index.html for all page routes

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server Running at ".concat(port));
});