const Cors = require("../controllers/cors");

const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

// router.get("/", PostsController.Index);
router.post("/", LikesController.Create);
router.options("/", Cors.Options);

module.exports = router;
