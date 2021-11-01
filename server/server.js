import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import users from './routes/users';
// import usersRouter from './routes/users.js';
// import videosRouter from './routes/video';
// import categoriesRouter from './routes/categories';

// Define "require"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const Users = require("./routes/users");

// Environment Variables
dotenv.config();
console.log("==usersRouter==", users);
const app = express();

console.log('process.env.MONGO_URI',process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => {
    console.log('mongoose.connect error: ', error)
    process.exit(-1);
  });

mongoose.connection.on("error", (err) => {
  console.log('mongoose.connection.onerror: ', err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/categories', require('./routes/categories'));

//use this to show the image you have in node js server to client (react js)
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});