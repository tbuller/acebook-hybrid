const Cors = require("../controllers/cors");

const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.ShowMyPosts);
router.options("/", Cors.Options);

module.exports = router;
