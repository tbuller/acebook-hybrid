
const express = require("express");
const router = express.Router();


const PostsController = require("../controllers/posts");

router.get("/", PostsController.ShowMyPosts);

module.exports = router;
