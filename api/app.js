// CHANGE RESPONSE ON OPTIONS REQUEST TO INCLUDE HEADER ALLOW ORIGIN SOMETHING LOOK AT CONSOLE ERROR IN DEPLOY SERVER

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const profilesRouter = require("./routes/profiles");
const myPostsRouter = require("./routes/myPosts");

const app = express();

// setup for receiving JSON
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
// changed to "build" from "public" below
app.use(express.static(path.join(__dirname, "build")));

// NEW STUFF FOR DEPLOY
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, *");
  }
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
