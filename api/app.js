const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const TokenGenerator = require("./models/token_generator");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const profilesRouter = require("./routes/profiles");
const myPostsRouter = require("./routes/myPosts");
const myPosterLookupRouter = require("./routes/posterLookup");

const app = express();
app.use(fileUpload());

// setup for receiving JSON
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/comments", tokenChecker, commentsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use("/likes", tokenChecker, likesRouter);
app.use("/profiles", tokenChecker, profilesRouter);
app.use("/myPosts", tokenChecker, myPostsRouter);
app.use("/posterLookup", tokenChecker, myPosterLookupRouter);

app.use("/upload", tokenChecker, (req, res) => {
  //TODO add tokenChecker
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No image to upload from app js");
  }


  let fileToUpload = req.files.photo;
  fileToUpload.mv(
    `../frontend/public/${req.files.photo.name}`,
    async function (err) {
      if (err) return res.status(500).send(err);
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "File Uploaded", token: token });
    }
  );
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
