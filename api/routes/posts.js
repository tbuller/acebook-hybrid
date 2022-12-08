const Cors = require("../controllers/cors");

const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.options("/", Cors.Options);

module.exports = router;
